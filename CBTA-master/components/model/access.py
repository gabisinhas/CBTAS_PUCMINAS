from cloudant.client import Cloudant
from cloudant.adapters import Replay429Adapter
import os
from data_base import partitions
from data_base.database_operations import db_search_selector, db_update
import logging
from components.util import bluepages as bp
from flask import session
import data_base.database_operations as database


def get_user_roles(email=None):
    """This component returns the application user roles."""

    if email:

        # 1. Retrieve Access
        doc = database.db_select_by_id("settings:24500b5142bc48a7a2e905ac0bd60f21")

        # 2. Return the admin access
        if email in doc['admin_access']:
            return "admin"

    # 3. Return the end user access
    return "end_user"


def get_roles():
    """This component returns the application roles list."""

    # 1. Connect to the Database
    db = Cloudant.iam(os.getenv('DB_ACCOUNT_NAME'),
                      os.getenv('DB_KEY'),
                      url=os.getenv('DB_URL'),
                      connect=True,
                      adapter=Replay429Adapter(retries=30, initialBackoff=0.03))
    my_database = db[os.getenv('DB_NAME')]

    # 2. Retrieve the access roles of the related user
    result = my_database.get_partitioned_query_result(
        partitions.get_partitions()['settings'], selector={'type': {'$eq': 'access'}}
    )

    # 3. Return the result list
    role_list = []
    for doc in result:
        for key, value in doc['roles'].items():
            role_list.append(key)  # Parse the result
        return role_list

    return None


def get_application_level_users():
    """This component returns the application level users list."""

    try:
        # 1. Retrieve the list of users from database
        access = db_search_selector({
            "type": {
                "$eq": "access"
            }
        },
            [],
            partition_key=partitions.get_partitions()['settings'])

        users = access[0]['users']

        # 2. Parse the result

        result = []
        for email, params in users.items():
            result.append({'email': email, 'name': params['name'], 'roles': params['roles']})

        # 2. Return the result list
        return result

    except Exception as e:
        logging.warning(msg="get_application_level_users - exception: " + str(e))
        return None


def get_roles_details():
    """This component returns the application access roles."""

    # 1. Connect to the Database
    db = Cloudant.iam(os.getenv('DB_ACCOUNT_NAME'),
                      os.getenv('DB_KEY'),
                      url=os.getenv('DB_URL'),
                      connect=True,
                      adapter=Replay429Adapter(retries=30, initialBackoff=0.03))
    my_database = db[os.getenv('DB_NAME')]

    # 2. Retrieve the user exception list
    result = my_database.get_partitioned_query_result(
        partitions.get_partitions()['settings'], selector={'type': {'$eq': 'access'}}
    )

    # 3. Return the result list
    for doc in result:
        return doc['roles']


def add_application_level_user(email, role=[], name=''):
    """"This component adds application level users, that differs from acronym level users."""
    try:
        # 1. 1.	Retrieve the current user data from the database
        access = db_search_selector({
            "type": {
                "$eq": "access"
            }
        },
            [],
            partition_key=partitions.get_partitions()['settings'])

        users = access[0]['users']

        # 2. Validate if the user exists already
        if email in users and email:
            return 202
        else:

            # 3. Add the new user and its role in the database
            users[email] = {'roles': role, 'name': name}

            # 4. Save the doc
            access[0]['users'] = users
            db_update(access[0])

            logging.info(msg="add_application_level_user: {0}".format(email))
            return 200

    except Exception as e:
        logging.warning(msg="add_application_level_user - exception: " + str(e))
        return 500


def remove_application_level_user(email):
    """"This component removes application level users, that differs from acronym level users."""
    try:
        # 1. Retrieve the current user data from the database
        access = db_search_selector({
            "type": {
                "$eq": "access"
            }
        },
            [],
            partition_key=partitions.get_partitions()['settings'])

        users = access[0]['users']

        # 2. Validate if the user exists already
        if email in users and email:
            # 3. Add the new user and its role in the database
            del users[email]

            # 4. Save the doc
            access[0]['users'] = users
            db_update(access[0])

            logging.info(msg="remove_application_level_user: {0}".format(email))
            return 200
        else:
            return 202

    except Exception as e:
        logging.warning(msg="remove_application_level_user - exception: " + str(e))
        return 500


def add_application_level_user_role(email, role):
    """"This component adds application level user role"""
    try:
        roles_list = user_validation(email)[1]
        if len(roles_list) > 0:
            if role in roles_list:
                # 1. Retrieve the current user and its role data from the database
                access = db_search_selector({
                    "type": {
                        "$eq": "access"
                    }
                },
                    [],
                    partition_key=partitions.get_partitions()['settings'])

                users = access[0]['users']

                # 2. Validate if the user role exists already
                if email in users and email:
                    if role not in users[email]['roles']:
                        # 3. Add the new user role
                        users[email]['roles'].append(role)

                        # 4. Save the doc
                        access[0]['users'] = users
                        db_update(access[0])

                        logging.info(msg="add_application_level_user_role: {0}".format(email))
                        return 200

        return 204

    except Exception as e:
        logging.warning(msg="add_application_level_user_role - exception: " + str(e))
        return 500


def remove_application_level_user_role(email, role):
    """"This component removes an application level user role."""
    try:
        # 1. Retrieve the current user data from the database
        access = db_search_selector({
            "type": {
                "$eq": "access"
            }
        },
            [],
            partition_key=partitions.get_partitions()['settings'])

        users = access[0]['users']

        # 2. Validate if the user and role exist
        if email in users:
            if role in users[email]['roles']:
                # 3. Add the new user and its role in the database
                users[email]['roles'].remove(role)

                # 4. Save the doc
                access[0]['users'] = users
                db_update(access[0])

                logging.info(msg="remove_application_level_user_role: {0}".format(email))
                return 200
            else:
                return 202
        else:
            return 202

    except Exception as e:
        logging.warning(msg="remove_application_level_user_role - exception: " + str(e))
        return 500


def user_validation(email=None):
    """This component validates the if the user is valid IBM
        employee and which roles can be assigned """

    # 1. Get the application roles
    roles = get_roles_details()
    code = 204
    roles_filtered = []

    # 2. Validate if it is a valid IBM id
    person_data = bp.get_person_data_via_email(email)
    if person_data is None:
        return [204, [], None]
    else:
        # 3. Define user blue pages profile flags
        manager_flag = bp.is_manager_with_flag(email)[0]
        manager_employees = bp.is_manager_with_employee(email)[0]
        in_country = True if session["country_code"] == person_data['employeecountrycode'] else False
        # in_country = True if person_data['employeecountrycode'] == '897' else False

        # 4. Validate user profile against roles parameters
        for key, value in roles.items():
            if value['mandatory_parameters']['manager_flag'] == True and manager_flag != True:
                continue

            if value['mandatory_parameters']['manager_employees'] == True and manager_employees != True:
                continue

            if value['mandatory_parameters']['in_country'] == True and in_country != True:
                continue

            code = 200
            roles_filtered.append(key)

    return [code, roles_filtered, person_data['callupname']]


def get_assessment_support(type_query=None):

    # 0. Parse type_query
    if type(type_query) is str:
        type_query = [type_query]

    # 1. Get settings document from the database
    settings = database.db_get_all_by_partition("settings")[0]

    # 2. From this document get the list of support contacts
    support_contacts = settings["support_contacts"]

    # 3. Iterate the type_query list and get the support contact for each entry
    support_contact_data = {}

    for item in type_query:
        support_contact_data[item] = support_contacts[item]

    # 4. Return the support contact
    return support_contact_data


