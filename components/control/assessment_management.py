import os

from flask import Blueprint, jsonify, request, session
import components.model.assessment as assessment_model
import logging
import data_base.db as database

# 1. Define the blueprint that will hold routes for assessment_management (organizer)
assessment_management = Blueprint('assessment_management', __name__)


# 2. Define the route that will manage the assessment subject requests
@assessment_management.route('/assessment-management/assessment/', methods=['GET', 'POST', 'PUT', 'DELETE'])  # it is the decorator that will promote this function to API
def assessment():

    """This component manages the CBTA assessment"""

    logging.info(">>assessment: Starting<<")

    try:
        # 1. Add a Assessment Request
        if request.method == 'POST':

            # 1. Get Input data
            if request.json: # Validate if the request has content in the body as JSON

                new_assessment = request.json

                # Add assessment
                code_result, result = assessment_model.add_assessment(assessment=new_assessment)

                logging.info(">> assessment: POST <<")
                return jsonify(result), code_result

        if request.method == 'PUT':

            # 1. Get Input data
            if request.json: # Validate if the request has content in the body as JSON
                # Get the assessment document from database
                updated_doc = request.json

                database.db_update(updated_doc)

                logging.info(">> assessment: PUT <<")
                return jsonify({}), 200
            else:
                # Missing data
                return jsonify({}), 204

        # 2. Get Assessment Request
        if request.method == 'GET':
            code, result = assessment_model.get_assessments()
            return jsonify(result), code

    except Exception as e:
        logging.error("** assessment: exception ** ")
        logging.exception(str(e))
        return jsonify({'status': 'Internal error'}), 500


@assessment_management.route('/assessment-management/assessment/user/', methods=['GET'])
def user_assessments():
    """Retrieve current user assessment requests"""

    logging.info(">>user_assessments: Starting<<")

    try:
        code, result = assessment_model.get_user_owned_assessment(email=session["email"])

        return jsonify(result), code

    except Exception as e:
        logging.error("** user_assessments: exception ** ")
        logging.exception(str(e))
        return jsonify({'status': 'Internal error'}), 500
