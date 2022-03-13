from urllib.parse import urlparse, urljoin
import requests
from flask import render_template, request, jsonify, session, url_for, Blueprint
from werkzeug.utils import redirect

from components.model.access import get_user_roles
from data_base.database_operations import db_get_user_roles, db_get_settings
import logging
import os
from components.util.bluepages import personDataByEmail

# --- Import for OIDC --- #
from functools import wraps
from oic.oic.message import ProviderConfigurationResponse
from oic.oic import Client
from oic.utils.authn.client import CLIENT_AUTHN_METHOD
from oic.oic.message import RegistrationResponse
from oic.oic.message import AuthorizationResponse
from oic.utils.http_util import Redirect
from oic import rndstr

# OIDC Setup
OIDC_REQUEST_URI = os.getenv("OIDC_REQUEST_URI")
client = Client(client_authn_method=CLIENT_AUTHN_METHOD)
op_info = ProviderConfigurationResponse(
    version="1.0", issuer=os.getenv("SSO_URL"),
    authorization_endpoint=os.getenv("SSO_URL") + "/authorize",
    token_endpoint=os.getenv("SSO_URL") + "/token")
client.handle_provider_config(op_info, op_info['issuer'])
info = {"client_id": os.getenv('OIDC_CLIENT_ID'), "client_secret": os.getenv('OIDC_CLIENT_SECRET')}
client_reg = RegistrationResponse(**info)
client.store_registration_info(client_reg)

blue_print = Blueprint('security', __name__)

env_type = os.getenv("ENV_TYPE")


def authorization(f):
    """This is a decorator that will validate user authorization"""

    @wraps(f)
    def wrapper(*args, **kwargs):
        try:
            # 1. Get the current route
            route = request.url_rule

            # 2. Action process route rules
            if route.rule == "/<module_name>":
                if kwargs['module_name'] in ['settings', 'access', 'report']:

                    if 'admin' not in session["roles"]:
                        return render_template('notauthorized.html')

                if str(kwargs['module_name']).split("-")[0] in ['check', 'review']:
                    if 'focal_point' in session["roles"] or 'mobility' in session["roles"]:
                        return f(*args, **kwargs)
                    else:
                        return render_template('notauthorized.html')

                return f(*args, **kwargs)

        except Exception as e:
            logging.info(">> authorization error: " + str(e))
            return redirect('/error')

    return wrapper


def authentication(f):
    """This component works as a decorator for all web route in the application to verify if
    there is an opened user session (authenticated), if not it will redirect to IBM SSO then user can authenticate first.
    """

    @wraps(f)
    def wrapper(*args, **kwargs):
        logging.info(">> authentication validation <<")
        try:
            # 1. Check if the session is available
            if 'email' in session:
                return f(*args, **kwargs)
            else:
                # 2. In case of dev environment
                if env_type == "local":
                    session["code"] = "dev env"
                    session["email"] = "tfc@br.ibm.com"
                    session["roles"] = db_get_user_roles(session["email"])
                    session["serial_number"] = personDataByEmail(email="tfc@br.ibm.com")["serialnumber"]
                    session["policy_email"] = db_get_settings()["policy_email"]
                    return f(*args, **kwargs)
                # 3. In case no user session redirect to login
                return redirect(url_for("security.login", full_path=request.full_path.replace(request.url_root, '')))

        except Exception as e:
            logging.info(">> authentication error: " + str(e))
            return redirect('/error')

    return wrapper


def authentication_no_redirect(f):
    """This component works as a decorator for all web route in the application to verify if
    there is an opened user session (authenticated), if not it will redirect to IBM SSO then user can authenticate first.
    """

    @wraps(f)
    def wrapper(*args, **kwargs):
        logging.info(">> authentication validation <<")
        try:
            # 1. Check if the session is available
            if 'email' in session:
                return f(*args, **kwargs)
            else:
                # 2. Return not authorized message
                return jsonify({'message': 'not authorized'}), 401

        except Exception as e:
            logging.info(">> authentication error: " + str(e))
            return redirect('/error')

    return wrapper


def instrospectUser(code=None):
    """ This component has the responsibility to request user
    IBM SSO authentication details based on the token provided by IBM SSO after user login.
    """
    logging.info(">> instrospectUser: Start <<")
    if code:
        # --- 1. Prepare Token EndPoint Call ---- #
        url = os.getenv("SSO_URL") + "/token"
        query = {'client_id': os.getenv('OIDC_CLIENT_ID'),
                 'client_secret': os.getenv('OIDC_CLIENT_SECRET'),
                 'grant_type': 'authorization_code',
                 'redirect_uri': OIDC_REQUEST_URI,
                 'code': code}

        # --- 2. Call Token EndPoint --- #
        response = requests.post(url, data=query)

        # --- 4. Return token validation --- #
        data = response.json()

        # --- 5. Prepare Instrospect Call ---- #
        url = os.getenv("SSO_URL") + "/introspect"
        query = {'client_id': os.getenv('OIDC_CLIENT_ID'),
                 'client_secret': os.getenv('OIDC_CLIENT_SECRET'),
                 'token': data['access_token']}

        # --- 6. Call Introspect --- #
        response = requests.post(url, data=query)

        # --- 7. Return token validation --- #
        data = response.json()

        if data:
            if data['active'] == True:
                logging.info(">> instrospectUser: Token active <<")
                return data['sub']
    logging.info(">> instrospectUser: No code <<")
    return None


def is_safe_url(target):
    ref_url = urlparse(request.host_url)
    test_url = urlparse(urljoin(request.host_url, target))
    return test_url.scheme in ('http', 'https') and \
           ref_url.netloc == test_url.netloc


@blue_print.route("/security/login", methods=['GET', 'POST'])
def login():
    try:
        next = request.args.get('next')
        # is_safe_url should check if the url is safe for redirects.
        # See http://flask.pocoo.org/snippets/62/ for an example.
        if not is_safe_url(next):
            return os.abort(400)
        if 'email' in session:
            return Redirect("/")
        # 2. In case of dev environment
        if env_type == "local":
            session["code"] = "dev env"
            session["email"] = "tfc@br.ibm.com"
            session["serial_number"] = personDataByEmail(email="tfc@br.ibm.com")["serialnumber"]
            session['employeetype'] = 'NEWCO'
            session["roles"] = get_user_roles(session["email"])
            return Redirect("/")
        # Generate random data keys
        session["state"] = rndstr()
        session["nonce"] = rndstr()
        # Adding the user requested url for further redirect
        if 'full_path' in request.args:
            session[session["state"]] = request.args.get('full_path')
        args = {
            "client_id": client.client_id,
            "response_type": "code",
            "scope": ["openid"],
            "redirect_uri": OIDC_REQUEST_URI,
            "state": session["state"],
            "nonce": session["nonce"]
        }
        # Prepare SSO OP request
        auth_req = client.construct_AuthorizationRequest(request_args=args)
        login_url = auth_req.request(client.authorization_endpoint)
        # Redirect to IBM SSO OP
        return Redirect(login_url)
    except Exception as e:
        logging.warn("A exception occurs during authentication: " + e)
        resp = jsonify({'status': 'not able to authenticate due an internal issue'})
        resp.status_code = 500
        return resp

@blue_print.route("/security/logout")
def logout():
    if 'email' in session:
        session.clear()
        print(session)
    return render_template('logout.html')


@blue_print.route('/oidc', methods=['GET', 'POST'])
def oidc_response():
    # Parse the state and code returned back from SSO
    resp_oidc = request.query_string.decode("utf-8")
    aresp = client.parse_response(AuthorizationResponse, info=resp_oidc, sformat="urlencoded")

    # Validate authentication
    mail = instrospectUser(aresp["code"])
    if aresp["state"] == session["state"] and mail:
        session["code"] = aresp["code"]
        session["email"] = mail
        session["roles"] = db_get_user_roles(session["email"])
        session["serial_number"] = personDataByEmail(email=mail)["serialnumber"]
        session["policy_email"] = db_get_settings()["policy_email"]

        # If user has provided a specific url
        if aresp["state"] in session:
            return Redirect(session[aresp["state"]])
        else:
            Redirect("/")
    else:
        return Redirect("/error")