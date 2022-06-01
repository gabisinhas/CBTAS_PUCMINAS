import logging
import os
import datetime
import uuid
from flask import session
from cloudant.client import Cloudant
from cloudant.adapters import Replay429Adapter
from cloudant.document import Document

# ---------------------------------------------------- #
#                    Logging Setup                     #
# ---------------------------------------------------- #
logging.basicConfig(level=logging.INFO)

def setDatabase():
    global my_database
    db_name = os.getenv('DB_NAME')
    db_user = os.getenv('DB_USER')
    db_pass = os.getenv('DB_PWD')
    db_url = os.getenv('DB_URL')

    db = Cloudant.iam(db_user, db_pass, url=db_url, connect=True,
                      adapter=Replay429Adapter(retries=30, initialBackoff=0.03))
    my_database = db[db_name]


def test():
    """"This function will generate a new request id based on latest one saved on database"""
    try:
        # 1. Database connection setup
        setDatabase()

        # 2. Retrieve the document
        doc = {
            "id":"Gabriela",
            "email":"gabsanto",
        }
        print(doc)

        # 3. Create the document
        new_doc = my_database.create_document(doc)
        print(new_doc)
        if new_doc:
            return {'status': True,
                    '_id': doc['_id']}

        return {'status': None,
            '_id': None}

    except Exception as e:
        logging.warning(msg="error: " + str(e))
        raise



