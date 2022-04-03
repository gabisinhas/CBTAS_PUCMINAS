from flask import Blueprint, session, request, jsonify
import logging
from components.model.access import get_application_level_users, \
                                    get_roles, \
                                    add_application_level_user, \
                                    remove_application_level_user, \
                                    add_application_level_user_role, \
                                    remove_application_level_user_role

# 1. Define the blueprint


access_management = Blueprint('access_management', __name__)


# 2. Define control

@access_management.route('/user-management/users/<email>', methods=['DELETE', 'PUT'])
@access_management.route('/user-management/users/', methods=['GET'])
def application_users(email=None):
    """ This component manages the user access, adding, removing or listing"""

    logging.info(">> application_users: Starting <<")

    try:
        # 1. Get all current users and their roles
        if request.method == 'GET':

            data = {
                'roles': get_roles(),
                'users': get_application_level_users()
            }
            logging.info(">> application_users: GET <<")
            return jsonify(data), 200

        # 2. Add new user to the database
        elif request.method == 'PUT':
            if email:
                code, roles, email= None
                if code == 200:
                    logging.info(">> application_users: PUT <<")
                    return jsonify({'status': 'success'}), add_application_level_user(email=email)
                return jsonify({'status': 'not added'}), code

        # 3. Delete the user from the database
        elif request.method == 'DELETE':
            if email:
                logging.info(">> application_users: DELETE <<")
                return jsonify({'status': 'success'}), remove_application_level_user(email)

    except Exception as e:
        logging.error("** reports_export: exception ** ")
        logging.exception(str(e))
        return jsonify({'status': 'Internal error'}), 500


@access_management.route('/user-management/roles/<email>/<role>', methods=['PUT', 'DELETE'])
def user_roles(email=None, role=None):
    try:
        logging.info(">> user_roles: Starting <<")

        if request.method == 'PUT':
            if email and role:
                logging.info(">> user_roles: PUT <<")
                return jsonify({}), add_application_level_user_role(email, role)

        elif request.method == 'DELETE':
            if email and role:
                logging.info(">> user_roles: DELETE <<")
                return jsonify({}), remove_application_level_user_role(email, role)

        return jsonify({'status': 'Internal error'}), 500

    except Exception as e:
        logging.error("** user_roles: exception ** ")
        logging.exception(str(e))
        return jsonify({'status': 'Internal error'}), 500


@access_management.route('/user-management/user/cpf', methods=['GET'])
def user_management():
    try:
        logging.info(">> user_management: Starting <<")

        if "cpf" in session:
            return jsonify({'cpf': session["cpf"]}), 200

        return jsonify({'status': 'No authorized'}), 401

    except Exception as e:
        logging.error("** user_management: exception ** ")
        logging.exception(str(e))
        return jsonify({'status': 'Internal error'}), 500


