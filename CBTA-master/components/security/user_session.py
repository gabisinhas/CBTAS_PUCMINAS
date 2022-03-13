import os
from flask import session


def get_user_session():
    """ This function returns the user session data"""
    if os.getenv("ENV_TYPE") == "local":
        # Scenario for local development environment
        return {
            "email": "tfc@br.ibm.com",
            "roles": None
        }
    else:
        # Scenario for cloud environment
        return {
            "email": session["email"],
            "roles": session["roles"]
        }
