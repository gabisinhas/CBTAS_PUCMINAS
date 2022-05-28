import logging
import os
import datetime
import uuid
from flask import session
from cloudant.client import Cloudant
from cloudant.adapters import Replay429Adapter
from cloudant.document import Document

import data_base.db
from components.util.tools import synchronized
import data_base.db as data_base

# ---------------------------------------------------- #
#                    Logging Setup                     #
# ---------------------------------------------------- #
logging.basicConfig(level=logging.INFO)
from components.util.tools import synchronized
from data_base import partitions

def setDatabase():
    global my_database
    db_name = os.getenv('DB_NAME')
    db_user = os.getenv('DB_USER')
    db_pass = os.getenv('DB_PWD')
    db_url = os.getenv('DB_URL')

    db = Cloudant.iam(db_user, db_pass, url=db_url, connect=True,
                      adapter=Replay429Adapter(retries=30, initialBackoff=0.03))
    my_database = db[db_name]

setDatabase()

def add_assessment(assessment=None):
    """This component adds the record in the Cloudant (assessment) for CBTA assessment """

    if assessment is None:
        return [500, None]
    logging.info(msg="add_assessment - Start: ")

    try:

        # 1. Generate assessment ID (unique)
        assessment_id = data_base.next_id()

        # 2. Add the assessment ID in the object
        assessment['assessment_id'] = assessment_id

        # 3. Add control data
        assessment['created_date'] = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M"))
#       assessment['created_by'] = user_session.get_user_session()['email']

        # 4. Add the object in the database
#        result = database.db_create(doc=assessment, partition=None)
        result = data_base.db_create(doc=assessment, partition="assessment")

        # 5. Return result
        if result['status'] is True:
            return [200, None]

    except Exception as e:
        logging.info(msg="add_assessment exception: " + str(e))
    return [500, None]


def next_id():
    """"This function will generate a new request id based on latest one saved on database"""
    try:
        # 1. Database connection setup
        setDatabase()

        # 2. Retrieve the document
        docs = db_get_all_by_partition(partitions.get_partitions()["settings"])

        # 3. Get the latest ID
        latest_id = docs[0]["latest_id"]

        # 4. Increment to the next one
        latest_id = latest_id + 1

        # 5. Generate the full ID
        parse_id = "SR" + str(latest_id).zfill(6)

        # 6. Update the latest ID
        doc = Document(my_database, docs[0]['_id'])
        doc.fetch()
        doc.field_set(doc, 'latest_id', latest_id)
        doc.save()
        print('doc')

        # 7. Return
        return parse_id
        print('parse_id')

    except Exception as e:
        logging.warning(msg="ID generation exception: " + str(e))
        raise

def db_get_all_by_partition(partition_key=None):
    """This function returns all documents from a partition """

    if partition_key:
        # 1. Defining database connection
        setDatabase()

        # 3. Query by partition
        result = my_database.partitioned_all_docs(partition_key, include_docs=True)

        # 4. Processing the result
        docs = []
        for doc in result['rows']:
            docs.append(doc['doc'])

        return docs

    return None

def test_add_assessment():
    # 1. define object
    test_object = {
        "nome": "Gabriela",
        "business_unit": "CIO"
    }

    # 2. Assert function
    data_base.db_create(test_object,partition="Assessment")

test_add_assessment()
