import os
import logging
import smtplib
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email import encoders
from components.security import user_session


def send_blue_mail(sender=None, recipients=None, recipient_cc=None, subject=None, body=None):

    try:
        # 0. Define sender email
        if sender is None:
            from_mail = os.getenv("TOOL_MAIL")
        else:
            from_mail = sender

        # 1. Parsing TO address from BlueMail API expected to comma separate values
        to_address = []
        if recipients:
            for i, v in enumerate(recipients):
                to_address.append(v)

        # 2. Parsing CC address from BlueMail API expected to comma separate values
        cc_address = []
        if recipient_cc:
            for i, v in enumerate(recipient_cc):
                cc_address.append(v)

        with smtplib.SMTP(os.getenv("SMTP_SERVER")) as server:

            message = MIMEMultipart("alternative")
            rcpt = []
            if to_address:
                rcpt = to_address
                recipients.clear()

            if recipient_cc:
                message["Cc"] = ",".join(cc_address)
                rcpt.extend(cc_address)

            body = MIMEText(body, "html")

            message.attach(body)
            print("**** contacts: {0}".format(rcpt))
            for x in rcpt:
                recipients = x
                if x == user_session.get_user_session()['email']:
                    message["Subject"] = subject
                    server.sendmail(from_mail, recipients, message.as_string())
                else:
                    message["Subject"] = subject
                    server.sendmail(from_mail, recipients, message.as_string())
            server.quit()

            return True

        return False

    except Exception as e:
        logging.warning(msg="mail_send - exception: " + str(e))
        return 500, {}
