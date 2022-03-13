import datetime
import uuid
from cloudant import Cloudant
import os
from cloudant.adapters import Replay429Adapter
import logging

db_name = os.getenv('DB_NAME')
db_user = os.getenv('DB_ACCOUNT_NAME')
db_pass = os.getenv('DB_KEY')
db_url = os.getenv('DB_URL')


def track_history_action(object_before_change=None,
                         object_after_change=None,
                         action_type=None,
                         action_owner=None,
                         action_owner_behalf=None):
    """
        This component is responsible to record all actions in the system that leads to a change in the data.
        Input data:
            1 - object before change
            2 - object after change
            3 - action type (Add, Remove, Update or a custom one)
            4 - action owner (user email or system)
            5 - action owner behalf
    """
    try:
        if action_owner and action_type and (object_after_change or object_before_change):

            # 1. Define the action datetime
            action_datetime = str(datetime.datetime.now())

            # 2. Identify the logical partition
            doc_key = "history-{partition}:{id}".format(partition=object_after_change["_id"].split(":")[0],
                                                        id=str(uuid.uuid4()))

            # 3. Prepare the new history document
            history_doc = {
                '_id': doc_key,
                'action_type': action_type,
                'action_owner': action_owner,
                'action_owner_behalf': action_owner_behalf,
                'action_date': action_datetime,
                'object_before_change': object_before_change,
                'object_after_change': object_after_change
            }
            # 4. Add the document in the database
            # 4.1 Prepare database connection
            db = Cloudant.iam(db_user,
                              db_pass,
                              url=db_url,
                              connect=True,
                              adapter=Replay429Adapter(retries=30, initialBackoff=0.03))
            my_database = db[db_name]

            # 4.2 Create the document
            result = my_database.create_document(history_doc)

            # 5. Return the action result
            if result:
                return True

    except Exception as e:
        logging.error("** Model - track_history_action: exception ** ")
        logging.exception(str(e))

    return None
