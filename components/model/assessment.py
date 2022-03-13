import datetime
import logging
import os

import data_base.database_operations as database
import data_base.partitions as partitions
import components.security.user_session as user_session
from components.model import communication
from components.model.templates import template_notification, template_notification_requester
from components.util import bluepages


def add_assessment(assessment=None):
    """This component adds the record in the Cloudant (assessment) for CBTA assessment """

    if assessment is None:
        return [500, None]
    logging.info(msg="add_assessment - Start: ")

    try:

        # 1. Generate assessment ID (unique)
        assessment_id = database.next_id()

        # 2. Add the assessment ID in the object
        assessment['assessment_id'] = assessment_id

        # 3. Add control data
        assessment['created_date'] = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M"))
        assessment['created_by'] = user_session.get_user_session()['email']

        # 4. Add the object in the database
        result = database.db_create(doc=assessment, partition="assessment")

        # 5. Return result
        if result['status'] is True:

            # Email to the requester
            body_data = {'ticket_number': assessment['assessment_id'],
                         'employee_name': assessment['first_name'],
                         'employee_name_last': assessment['last_name'],
                         'employee_cnum': assessment['serial_number'],
                         'employee_email': assessment['email'],
                         'nationality': assessment['nationality'],
                         'cbta_status': assessment['cbta_question'],
                         'home_country': assessment['origin_country'],
                         'destination_country': assessment['destin_country'],
                         'start_date': assessment['planned_start'],
                         'end_date': assessment['planned_end'],
                         'query_type': ', '.join(assessment['query_type']),
                         'query_description': assessment['query_desc'],
                         'residency_status': assessment['residency_status'],
                         'residency_details': assessment['details_visa'],
                         'assessment_id': assessment['assessment_id'],
                         'assessment_link': os.getenv("SERVER_URL") + "/view_assessment?id=" + result["_id"].split(":")[1],
                         'tool_image_link': os.getenv("SERVER_URL") + '/static/images/',
                         'assessment_download': "<a href=" + os.getenv("SERVER_URL") + '/assessment_attachment?assessment_id=' + result["_id"].split(":")[1] + "><b>Download the assessment result</b></a>" if assessment['cbta_question'] == "Yes" else "No CBTA assessment result provided"}
            ''

            body, subject = template_notification_requester(body_data=body_data)

            communication.send_blue_mail(sender=os.getenv("TOOL_MAIL"),
                                         recipients=[assessment["email"]],
                                         recipient_cc=[assessment["email_copy"]] if ("@" in assessment["email_copy"] and "ibm.com" in assessment["email_copy"]) else None,
                                         subject=subject,
                                         body=body)

            support_contact_sent = []
            for area, contacts in assessment["support_contact"].items():

                for contact in contacts:

                    # Email notification to support team
                    #person = bluepages.get_person_data_via_email(contact)

                    #if 'preferredfirstname' in person:
                    if contact not in support_contact_sent:
                        body, subject = template_notification(body_data=body_data)

                        communication.send_blue_mail(sender=os.getenv("TOOL_MAIL"),
                                                     recipients=[contact],
                                                     subject=subject,
                                                     body=body)

                        support_contact_sent.append(contact)

            return [200, {'_id': result['_id'], 'assessment_id': assessment_id}]

        return [500, None]

    except Exception as e:
        logging.info(msg="add_assessment exception: " + str(e))
        return [500, None]


def get_user_owned_assessment(ibm_user_serial=None):
    """This component retrieves all assessment submitted by the current user logged in the system"""
    try:
        logging.info(msg="get_user_owned_assessment - Start")
        if ibm_user_serial:
            # 1. Select from database the records filtering by the user email
            selector = {
                "serial_number": {
                    "$eq": ibm_user_serial
                }
            }

            # 2. Sort the results by desc created date
            assessments = database.db_search_selector_partitioned(selector=selector, fields=[], partition_key="assessment")

            # 3. Sort calendars by date descending
            assessments = sorted(assessments, key=lambda i: i['created_date'], reverse=True)

            # 3. Return the result
            return [200, assessments]

        # Missing input
        return [202, None]
    except Exception as e:
        logging.info(msg="get_user_owned_assessment exception: " + str(e))
        return [500, None]


def get_assessments(limit=None):
    """This component retrieves all assessment and set limit of return if needed"""
    try:
        logging.info(msg="get_assessments - Start")
        # 2. Sort the results by desc created date
        # assessments = database.db_search_selector(
        #     selector={'_id': {'$gt': '0'}},
        #     fields=[],
        #     # sort=[{'created_date': 'desc'}],
        #     limit=limit,
        #     partition_key=partitions.get_partitions()["assessment"])

        assessments = database.db_get_all_by_partition(partitions.get_partitions()["assessment"])

        # 3. Sort calendars by date descending
        assessments = sorted(assessments, key=lambda i: i['created_date'], reverse=True)

        # 3. Return the result
        return [200, assessments]

    except Exception as e:
        logging.info(msg="get_assessments exception: " + str(e))
        return [500, get_assessments]
