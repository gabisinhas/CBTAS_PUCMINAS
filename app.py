# --- Main imports --- #
# import flask
from flask import Flask, render_template

import logging
import os
from datetime import timedelta
import components.control.assessment_management as assessment
import components.control.security as security
import components.control.access_management as access_management


logging.basicConfig(level=logging.INFO)
# Git
# APP Flask Setup
app = Flask(__name__)
app.secret_key = os.getenv('SESSION_SECRET')
app.permanent_session_lifetime = timedelta(hours=10)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JSON_SORT_KEYS'] = False
env_type = os.getenv("ENV_TYPE")
app.register_blueprint(assessment.assessment_management)
app.register_blueprint(security.security)
app.register_blueprint(access_management.access_management)


@app.route('/', methods=['GET'])
@security.authentication
def index():
    return render_template('home_createaccount.html', env_type=os.getenv("ENV_TYPE"))


@app.route('/<module_name>', methods=['GET'])
@security.authentication
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
    app.run(host="0.0.0.0", port=8080)
