from functools import wraps
import pathlib
import requests
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
from os import abort
import logging
from flask import Flask, redirect, session, request, render_template, url_for
from datetime import timedelta
import os

app = Flask(__name__)
app.secret_key = 'Session_Secret'
app.permanent_session_lifetime = timedelta(hours=10)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JSON_SORT_KEYS'] = False
env_type = os.getenv("ENV_TYPE")
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"  #this is to set our environment to https because OAuth 2.0 only supports https environments

env_type = os.getenv("ENV_TYPE")
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"  #this is to set our environment to https because OAuth 2.0 only supports https environments

GOOGLE_CLIENT_ID = "GOOGLE_CLIENT_ID"  #enter your client id you got from Google console
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")  #set the path to where the .json file you got Google console is

flow = Flow.from_client_secrets_file(  #Flow is OAuth 2.0 a class that stores all the information on how we want to authorize our users
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],  #here we are specifing what do we get after the authorization
    redirect_uri="http://127.0.0.1:5000/callback"  #and the redirect URI is the point where the user will end up after the authorization
)

def authentication(f):  #a function to check if the user is authorized or not
    @wraps(f)
    def wrapper(*args, **kwargs):
        logging.info(">> authentication validation <<")
        try:
            # 1. Check if the session is available
            if "google_id" in session:
                return wrapper
            else:
                # 2. In case of dev environment
                if env_type == "local":
                    session["code"] = "dev env"
                    session["email"] = "gabisinhas.santos@gmail.com.br"
                    return wrapper
                # 3. In case no user session redirect to login
            return redirect(url_for("security/login", full_path=request.full_path.replace(request.url_root, '')))

        except Exception as e:
            logging.info(">> authentication error: " + str(e))
            return redirect('/error')

    return wrapper


@app.route("/login", methods=['GET', 'POST'])  #the page where the user can login
def login():
    authorization_url, state = flow.authorization_url()  #asking the flow class for the authorization (login) url
    session["state"] = state
    return redirect(authorization_url)


@app.route("/callback")  #this is the page that will handle the callback process meaning process after the authorization
def callback():
    flow.fetch_token(authorization_response=request.url)

    if not session["state"] == request.args["state"]:
        abort(500)  #state does not match!

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    session["google_id"] = id_info.get("sub")  #defing the results to show on the page
    session["name"] = id_info.get("name")
    return redirect("/home_page")  #the final page where the authorized users will end up


@app.route("/logout")  #the logout page and function
def logout():
    session.clear()
    return redirect("/")


#@app.route("/")  #the home page where the login button will be located
#def index():
#    return "Hello World <a href='/login'><button>Login</button></a>"


@app.route('/', methods=['GET'])
def index():
    return render_template('home_page.html', env_type=os.getenv("ENV_TYPE"))


@app.route("/protected_area")  #the page where only the authorized users can go to
@authentication
def protected_area():
    return f"Hello {session['name']}! <br/> <a href='/logout'><button>Logout</button></a>"  #the logout button


@app.route('/<module_name>', methods=['GET'])
def render_page(module_name):
    """This is an API component responsible to return a HTML page requested.
       This system is composed of many modules that needs HTML pages with its
       JavaScript and CSS to render the page to the user in the user’s web browser.
       It expects the module name as parameter input and will return the proper page.
    """
    return render_template(module_name + '.html', env_type=os.getenv("ENV_TYPE"))

# ---------------------------------------------------- #
#                  Flask App Start                     #
# ---------------------------------------------------- #
if __name__ == '__main__':

    # scheduler = BackgroundScheduler(daemon=True)
    # scheduler.add_job(run_agent, 'interval', seconds=(1 * 60))
    # scheduler.start()
    app.run(host="0.0.0.0", port=5000)