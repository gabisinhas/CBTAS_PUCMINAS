import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os


def send_blue_mail(from_mail=None, to_address=None, cc_address=None, subject=None, body=None,bcc_address=None):

    with smtplib.SMTP(os.getenv("SMTP_SERVER")) as server:

        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        rcpt = []
        if to_address:
            message["To"] = to_address
            rcpt = [to_address]

        if cc_address:
            message["Cc"] = cc_address
            rcpt = rcpt + cc_address.split(",")

        if bcc_address:
            message["Bcc"] = bcc_address
            rcpt = rcpt + bcc_address.split(",")

        body = MIMEText(body, "html")

        message.attach(body)

        server.sendmail(from_mail, rcpt, message.as_string())
        server.quit()

        return True

    return False
