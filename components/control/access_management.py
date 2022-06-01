from flask import Blueprint, request, jsonify
import logging
import data_base.db as database
import components.model.user as user_mgt


# 1. Define the blueprint
access_management = Blueprint('access_management', __name__)


# 2. Define control

@access_management.route('/user-management/users/<email>', methods=['DELETE', 'PUT'])
@access_management.route('/user-management/users/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def user():

    """This component manages the CBTA assessment"""

    logging.info(">>assessment: Starting<<")

    try:
        # 1. Add a Assessment Request
        if request.method == 'POST':

            # 1. Get Input data
            if request.json: # Validate if the request has content in the body as JSON

                new_user = request.json

                # Add assessment
                code_result, result = user_mgt.add_user(user=new_user)

                logging.info(">> New User: POST <<")
                return jsonify(result), code_result

        if request.method == 'PUT':

            # 1. Get Input data
            if request.json: # Validate if the request has content in the body as JSON
                # Get the assessment document from database
                updated_doc = request.json

                database.db_update(updated_doc)

                logging.info(">> User: PUT <<")
                return jsonify({}), 200
            else:
                # Missing data
                return jsonify({}), 204

    except Exception as e:
        logging.error("** user: exception ** ")
        logging.exception(str(e))
        return jsonify({'status': 'Internal error'}), 500
