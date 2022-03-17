import logging
import os
from cloudant.client import Cloudant
from cloudant.adapters import Replay429Adapter
from cloudant.document import Document

# ---------------------------------------------------- #
#                    Logging Setup                     #
# ---------------------------------------------------- #

logging.basicConfig(level=logging.INFO)


def setdatabase():
    global my_database
    db_name = os.getenv('DB_NAME')
    db_account_name = os.getenv('DB_ACCOUNT_NAME')
    db_iam_key = os.getenv('DB_KEY')
    db_url = os.getenv('DB_URL')

    db = Cloudant.iam(db_account_name, db_iam_key, url=db_url, connect=True,
                    adapter=Replay429Adapter(retries=30, initialBackoff=0.03))
    my_database = db[db_name]

def db_update(doc):
    doc_id = doc['_id':'SR00001']
    setdatabase()
    doc_to_update = my_database[doc_id]
    doc_to_update.update(doc)
    doc_to_update.save()

    print(doc_id)

setdatabase()