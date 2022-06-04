import datetime
import logging
import os

import data_base.db as database
import data_base.partitions as partitions
import components.security.user_session as user_session
from components.model import communication
from components.model.templates import template_notification, template_notification_requester


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
#       assessment['created_by'] = user_session.get_user_session()['email']

        # 4. Add the object in the database
        result = database.db_create(doc=assessment, partition="assessment")

        # 5. Return result
        if result['status'] is True:
            return [200, None]

    except Exception as e:
        logging.info(msg="add_assessment exception: " + str(e))
    return [500, None]


def get_user_owned_assessment(email=None):
    """This component retrieves all assessment submitted by the current user logged in the system"""
    try:
        logging.info(msg="get_user_owned_assessment - Start")
        if email:
            # 1. Select from database the records filtering by the user email
            selector = {
                "email": {
                    "$eq": email
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
