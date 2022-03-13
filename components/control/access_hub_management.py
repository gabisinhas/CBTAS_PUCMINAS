from flask import request, jsonify, Blueprint
from flask_basicauth import BasicAuth
import logging
import data_base.database_operations as database

blue_print = Blueprint('access_hub', __name__)

access_hub_auth = BasicAuth()


@blue_print.route("/access_hub", methods=['POST'])
@access_hub_auth.required
def access_hub():
    try:
        return jsonify({}), 200
    except Exception as e:
        logging.warning("A exception occurs during access hub processing: ", e)
        resp = jsonify({})
        resp.status_code = 401
        return resp


@blue_print.route("/access_hub/account", methods=['POST', 'PUT'])
@access_hub_auth.required
def account():
    try:
        if request.method == 'POST':
            if request.json:
                logging.info("account creation")
                logging.info(request.json)
                return jsonify({}), 200

        if request.method == 'PUT':
            if request.json:
                logging.info("account deletion")
                logging.info(request.json)
                database.db_remove_access_user(request.json["email"])
                return jsonify({}), 200
        return jsonify({}), 401
    except Exception as e:
        logging.warning("A exception occurs during access hub account processing: ", e)
        resp = jsonify({})
        resp.status_code = 401
        return resp


@blue_print.route("/access_hub/access", methods=['POST', 'PUT'])
@access_hub_auth.required
def access():
    try:
        if request.method == 'POST':
            if request.json:
                logging.info("access creation")
                logging.info(request.json)
                database.db_add_access_user_role(user=request.json["email"], role=request.json["entitlement"])
                return jsonify({}), 200

        if request.method == 'PUT':
            if request.json:
                logging.info("access deletion")
                logging.info(request.json)
                database.db_remove_access_user_role(user=request.json["email"], role=request.json["entitlement"])
                return jsonify({}), 200
        return jsonify({}), 401
    except Exception as e:
        logging.warning("A exception occurs during access hub access processing: ", e)
        resp = jsonify({})
        resp.status_code = 401
        return resp
