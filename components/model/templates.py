import os
from flask import session


def template_notification(body_data={}):
    if session['employeetype'] == 'NEWCO':
        # 1. Return mail NEWCO filled
        data = ["""\
                <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
                               <html xmlns='http://www.w3.org/1999/xhtml'>
                               <head>
                                   <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
                                   <title>Demystifying Email Design</title>
                                   <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
                               </head>
                               <body bgcolor='#e0e0e0' align='left'>
                               <table width='620' bgcolor='#FFFFFF' cellspacing='0' cellpadding='3' border='0' align='center' style='font-family:Arial; font-size:16px'>
                                   <tr>
                                       <td width='620' bgcolor='#000000' valign='top'>
                                      <table width="100%">
                                        <tr>
                                          <td width="25%"><img src="{tool_image_link}logo-apro_email.png" border="0"></td>
                                          <td width="50%" align="center" style="color: white;">HR Global Mobility</td>
                                          <td width="25%" align="right"><img src="{tool_image_link}ibm_logo_email.png" border="0"></td>
                                        </tr>
                                      </table>
                                       </td>
                                  </tr>
                                  <tr>
                                   <td width='620' align='center' style='padding-bottom:24px;'>
                                       <img src='{tool_image_link}banner-v1.4.png' border='0' width="620px">
                               </td>
                               </tr>
                               <tr style='font-size:14px;'>
                                   <td width='620' valign='top' style='padding-left: 12px; padding-right: 8px;'>
                                         <font face='Arial';>
                                             <p style='margin:0px; font-size: 28px; padding-bottom:12px; padding-right:32px; padding-left:32px; padding-top:24px; padding-right:32px'>
                                             <b>Dear Team</b>,</p>
                                             <p style='margin:0px; font-size: 14px; padding-bottom:12px; padding-right:32px; padding-left:32px; padding-top:24px; padding-right:32px'>
                                             Please take action on this new request.</p>
                                             <p style='margin:0px; font-size: 14px; padding-right:32px; padding-left:32px; padding-top:48px; padding-bottom:32px;'>Request/Ticket No: <b>{ticket_number}</b></p>
                                             <p style='margin:0px; font-size: 14px; padding-right:32px; padding-left:32px; padding-top:8px; padding-bottom:32px;'>{assessment_download}</p>
                                         </font>
                                  <p style='color: #c6c6c6; margin-left: 32px; margin-right: 32px; border-bottom: 1px solid;'></p>
                                  <p style='padding-left:32px; padding-top:72px; padding-bottom:36px; margin:0px; font-size: 28px;'>Request <b>Summary</b></p>
                                  <p style='padding-left:32px; margin-top:0px; padding-bottom:24px; margin:0px; font-size: 16px;'> <b>Request Details</b><br><br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Employee Name:</b> {employee_name} {employee_name_last}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Employee CNUM:</b> {employee_cnum}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Email ID:</b> {employee_email}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Nationality:</b> {nationality}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;CBTA Status:</b> {cbta_status}<br></p>
                                  <p style='padding-left:32px; margin-top:0px; padding-bottom:24px; margin:0px; font-size: 16px;'> <b>Trip Details</b><br><br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Origin Country/Location:</b> {home_country} <br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Destination Country/Location:</b> {destination_country}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Planned Start Date:</b> {start_date}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Planned End Date:</b> {end_date}<br></p>
                                  <p style='padding-left:32px; margin-top:0px; padding-bottom:24px; margin:0px; font-size: 16px;'> <b>Query Details</b><br><br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Type of Query:</b> {query_type} <br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Query Description:</b> {query_description}<br></p>
                                  <p style='padding-left:32px; margin-top:0px; margin:0px; font-size: 16px;'> <b>Residential Status</b></p>
                                  <p style="padding-left:50px; padding-right:32px;"><b>Do you hold temporary/permanent work/residency status for the destination country or another country which you believe may impact your immigration requirements?</b> {residency_status} <br><br>
                                  <b>Details of temporary/permanent work/residency status (Country, Visa Type, Validity etc), related to the question above:</b> {residency_details}<br></p>
                                  <p style='color: #c6c6c6; margin-left: 32px; margin-right: 32px; padding-top:28px; border-bottom: 1px solid;'></p>
                                  <p style='padding-left:32px; padding-top:32px; padding-bottom:24px; margin:0px; font-size: 16px;'> You can review the request details <a href="{assessment_link}"><b>here</b></a>.</p>
                                  <p style='padding-left:32px; padding-right:32px; margin:0px; padding-bottom:24px; font-size: 16px;'> For more tips on Cross Border Travel Assessment and resource on the navigation of the tool click   <a href="https://w3.ibm.com/w3publisher/cbta"><b>here</b></a>.</p>
                                  <p style='padding-left:32px; padding-bottom:24px; margin:0px;'>Regards, <br><b>Global Mobility,</b></p>
                                  <p style='padding-left:32px; padding-bottom:24px; margin:0px;'><b>Immigration support: <a href='globalimmigration@kyndryl.com'>globalimmigration@kyndryl.com</a></b></p>
                                  <p style='padding-left:32px; padding-bottom:24px; margin:0px;'><b>Posted worker compliance support : <a href='globalimmigration@kyndryl.com'>globalimmigration@kyndryl.com</a></b></p>
                                  <p style='padding-left:32px; padding-bottom:24px; margin:0px;'><b>Tax support : <a href='globalmobilitytax@kyndryl.com'>globalmobilitytax@kyndryl.com</a></b></p>
                               </td>
                               </tr>
                               </td>
                               </tr>
                               </table>
                               </body>
                               </html>    
                        """.format(ticket_number=body_data['ticket_number'],
                                   employee_name=body_data['employee_name'],
                                   employee_name_last=body_data['employee_name_last'],
                                   employee_cnum=body_data['employee_cnum'],
                                   employee_email=body_data['employee_email'],
                                   nationality=body_data['nationality'],
                                   cbta_status=body_data['cbta_status'],
                                   home_country=body_data['home_country'],
                                   destination_country=body_data['destination_country'],
                                   start_date=body_data['start_date'],
                                   end_date=body_data['end_date'],
                                   query_type=body_data['query_type'],
                                   query_description=body_data['query_description'],
                                   residency_status=body_data['residency_status'],
                                   residency_details=body_data['residency_details'],
                                   assessment_id=body_data['assessment_id'],
                                   assessment_link=body_data['assessment_link'],
                                   tool_image_link=body_data['tool_image_link'],
                                   assessment_download=body_data['assessment_download']),
                "CBT - Trip query - New Assessment Request - {assessment_id}".format(
                    assessment_id=body_data['assessment_id'])]
        return data

    if session['employeetype'] != 'NEWCO':
        # 1. Return mail IBM filled
        data = ["""\
                <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
                               <html xmlns='http://www.w3.org/1999/xhtml'>
                               <head>
                                   <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
                                   <title>Demystifying Email Design</title>
                                   <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
                               </head>
                               <body bgcolor='#e0e0e0' align='left'>
                               <table width='620' bgcolor='#FFFFFF' cellspacing='0' cellpadding='3' border='0' align='center' style='font-family:Arial; font-size:16px'>
                                   <tr>
                                       <td width='620' bgcolor='#000000' valign='top'>
                                      <table width="100%">
                                        <tr>
                                          <td width="25%"><img src="{tool_image_link}logo-apro_email.png" border="0"></td>
                                          <td width="50%" align="center" style="color: white;">HR Global Mobility</td>
                                          <td width="25%" align="right"><img src="{tool_image_link}ibm_logo_email.png" border="0"></td>
                                        </tr>
                                      </table>
                                       </td>
                                  </tr>
                                  <tr>
                                   <td width='620' align='center' style='padding-bottom:24px;'>
                                       <img src='{tool_image_link}banner-v1.4.png' border='0' width="620px">
                               </td>
                               </tr>
                               <tr style='font-size:14px;'>
                                   <td width='620' valign='top' style='padding-left: 12px; padding-right: 8px;'>
                                         <font face='Arial';>
                                             <p style='margin:0px; font-size: 28px; padding-bottom:12px; padding-right:32px; padding-left:32px; padding-top:24px; padding-right:32px'>
                                             <b>Dear Team</b>,</p>
                                             <p style='margin:0px; font-size: 14px; padding-bottom:12px; padding-right:32px; padding-left:32px; padding-top:24px; padding-right:32px'>
                                             Please take action on this new request.</p>
                                             <p style='margin:0px; font-size: 14px; padding-right:32px; padding-left:32px; padding-top:48px; padding-bottom:32px;'>Request/Ticket No: <b>{ticket_number}</b></p>
                                             <p style='margin:0px; font-size: 14px; padding-right:32px; padding-left:32px; padding-top:8px; padding-bottom:32px;'>{assessment_download}</p>
                                         </font>
                                  <p style='color: #c6c6c6; margin-left: 32px; margin-right: 32px; border-bottom: 1px solid;'></p>
                                  <p style='padding-left:32px; padding-top:72px; padding-bottom:36px; margin:0px; font-size: 28px;'>Request <b>Summary</b></p>
                                  <p style='padding-left:32px; margin-top:0px; padding-bottom:24px; margin:0px; font-size: 16px;'> <b>Request Details</b><br><br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Employee Name:</b> {employee_name} {employee_name_last}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Employee CNUM:</b> {employee_cnum}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Email ID:</b> {employee_email}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Nationality:</b> {nationality}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;CBTA Status:</b> {cbta_status}<br></p>
                                  <p style='padding-left:32px; margin-top:0px; padding-bottom:24px; margin:0px; font-size: 16px;'> <b>Trip Details</b><br><br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Origin Country/Location:</b> {home_country} <br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Destination Country/Location:</b> {destination_country}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Planned Start Date:</b> {start_date}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Planned End Date:</b> {end_date}<br></p>
                                  <p style='padding-left:32px; margin-top:0px; padding-bottom:24px; margin:0px; font-size: 16px;'> <b>Query Details</b><br><br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Type of Query:</b> {query_type} <br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Query Description:</b> {query_description}<br></p>
                                  <p style='padding-left:32px; margin-top:0px; margin:0px; font-size: 16px;'> <b>Residential Status</b></p>
                                  <p style="padding-left:50px; padding-right:32px;"><b>Do you hold temporary/permanent work/residency status for the destination country or another country which you believe may impact your immigration requirements?</b> {residency_status} <br><br>
                                  <b>Details of temporary/permanent work/residency status (Country, Visa Type, Validity etc), related to the question above:</b> {residency_details}<br></p>
                                  <p style='color: #c6c6c6; margin-left: 32px; margin-right: 32px; padding-top:28px; border-bottom: 1px solid;'></p>
                                  <p style='padding-left:32px; padding-top:32px; padding-bottom:24px; margin:0px; font-size: 16px;'> You can review the request details <a href="{assessment_link}"><b>here</b></a>.</p>
                                  <p style='padding-left:32px; padding-right:32px; margin:0px; padding-bottom:24px; font-size: 16px;'> For more tips on Cross Border Travel Assessment and resource on the navigation of the tool click   <a href="https://w3.ibm.com/w3publisher/cbta"><b>here</b></a>.</p>
                                  <p style='padding-left:32px; padding-bottom:24px; margin:0px;'>Regards, <br><b>Global Mobility,</b></p>
                                  <p style='padding-left:32px; padding-bottom:24px; margin:0px;'><b>Immigration support: <a href='glosuppo@in.ibm.com'>glosuppo@in.ibm.com</a></b></p>
                                  <p style='padding-left:32px; padding-bottom:24px; margin:0px;'><b>Posted worker compliance support : <a href='PWDcompliance@in.ibm.com'>PWDcompliance@in.ibm.com</a></b></p>
                                  <p style='padding-left:32px; padding-bottom:24px; margin:0px;'><b>Tax support : <a href='bttctlr@in.ibm.com'>bttctlr@in.ibm.com</a></b></p>
                               </td>
                               </tr>
                               </td>
                               </tr>
                               </table>
                               </body>
                               </html>    
                        """.format(ticket_number=body_data['ticket_number'],
                                   employee_name=body_data['employee_name'],
                                   employee_name_last=body_data['employee_name_last'],
                                   employee_cnum=body_data['employee_cnum'],
                                   employee_email=body_data['employee_email'],
                                   nationality=body_data['nationality'],
                                   cbta_status=body_data['cbta_status'],
                                   home_country=body_data['home_country'],
                                   destination_country=body_data['destination_country'],
                                   start_date=body_data['start_date'],
                                   end_date=body_data['end_date'],
                                   query_type=body_data['query_type'],
                                   query_description=body_data['query_description'],
                                   residency_status=body_data['residency_status'],
                                   residency_details=body_data['residency_details'],
                                   assessment_id=body_data['assessment_id'],
                                   assessment_link=body_data['assessment_link'],
                                   tool_image_link=body_data['tool_image_link'],
                                   assessment_download=body_data['assessment_download']),
                "CBT - Trip query - New Assessment Request - {assessment_id}".format(
                    assessment_id=body_data['assessment_id'])]
        return data


def template_notification_requester(body_data={}):
    if session['employeetype'] == 'NEWCO':
        # 1. Return mail NEWCO requester filled
        data = ["""\
                <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
                               <html xmlns='http://www.w3.org/1999/xhtml'>
                               <head>
                                   <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
                                   <title>Demystifying Email Design</title>
                                   <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
                               </head>
                               <body bgcolor='#e0e0e0' align='left'>
                               <table width='620' bgcolor='#FFFFFF' cellspacing='0' cellpadding='3' border='0' align='center' style='font-family:Arial; font-size:16px'>
                                   <tr>
                                       <td width='620' bgcolor='#000000' valign='top'>
                                      <table width="100%">
                                        <tr>
                                          <td width="25%"><img src="{tool_image_link}logo-apro_email.png" border="0"></td>
                                          <td width="50%" align="center" style="color: white;">HR Global Mobility</td>
                                          <td width="25%" align="right"><img src="{tool_image_link}ibm_logo_email.png" border="0"></td>
                                        </tr>
                                      </table>
                                       </td>
                                  </tr>
                                  <tr>
                                   <td width='620' align='center' style='padding-bottom:24px;'>
                                       <img src='{tool_image_link}banner-v1.4.png' border='0' width="620px">
                               </td>
                               </tr>
                               <tr style='font-size:14px;'>
                                   <td width='620' valign='top' style='padding-left: 12px; padding-right: 8px;'>
                                         <font face='Arial';>
                                      <p
                                        style='margin:0px; font-size: 28px; padding-bottom:12px; padding-right:32px; padding-left:32px; padding-top:24px; padding-right:32px'>
                                          Dear <b>{employee_name}</b>,</p>
                                   <p
                                        style='margin:0px; font-size: 14px; padding-right:32px; padding-left:32px; padding-top:48px;'>
                                        Thank you for reaching out to the Cross Border Travel team. Your request has been received and is being reviewed by our support staff, <b>please allow the team 1 business day to respond.</b></p>
                                             <p style='margin:0px; font-size: 14px; padding-right:32px; padding-left:32px; padding-top:48px; padding-bottom:32px;'>Request/Ticket No: <b>{ticket_number}</b></p>
                                         </font>
                                  <p style='color: #c6c6c6; margin-left: 32px; margin-right: 32px; border-bottom: 1px solid;'></p>
                                  <p style='padding-left:32px; padding-top:72px; padding-bottom:36px; margin:0px; font-size: 28px;'>Request <b>Summary</b></p>
                                  <p style='padding-left:32px; margin-top:0px; padding-bottom:24px; margin:0px; font-size: 16px;'> <b>Request Details</b><br><br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Employee Name:</b> {employee_name} {employee_name_last}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Employee CNUM:</b> {employee_cnum}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Email ID:</b> {employee_email}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Nationality:</b> {nationality}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;CBTA Status:</b> {cbta_status}<br></p>
                                  <p style='padding-left:32px; margin-top:0px; padding-bottom:24px; margin:0px; font-size: 16px;'> <b>Trip Details</b><br><br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Origin Country/Location:</b> {home_country} <br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Destination Country/Location:</b> {destination_country}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Planned Start Date:</b> {start_date}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Planned End Date:</b> {end_date}<br></p>
                                  <p style='padding-left:32px; margin-top:0px; padding-bottom:24px; margin:0px; font-size: 16px;'> <b>Query Details</b><br><br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Type of Query:</b> {query_type} <br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Query Description:</b> {query_description}<br></p>
                                  <p style='padding-left:32px; margin-top:0px; margin:0px; font-size: 16px;'> <b>Residential Status</b></p>
                                  <p style="padding-left:50px; padding-right:32px;"><b>Do you hold temporary/permanent work/residency status for the destination country or another country which you believe may impact your immigration requirements?</b> {residency_status} <br><br>
                                  <b>Details of temporary/permanent work/residency status (Country, Visa Type, Validity etc), related to the question above:</b> {residency_details}<br></p>
                                  <p style='color: #c6c6c6; margin-left: 32px; margin-right: 32px; padding-top:28px; border-bottom: 1px solid;'></p>
                                  <p style='padding-left:32px; padding-top:32px; padding-bottom:24px; margin:0px; font-size: 16px;'> You can review the request details <a href="{assessment_link}"><b>here</b></a>.</p>
                                  <p style='padding-left:32px; padding-right:32px; margin:0px; padding-bottom:24px; font-size: 16px;'> For more tips on Cross Border Travel Assessment and resource on the navigation of the tool click   <a href="https://w3.ibm.com/w3publisher/cbta"><b>here</b></a>.</p>
                                  <p style='padding-left:32px; padding-bottom:24px; margin:0px;'>Regards, <br><b>Global Mobility,</b></p>
                                  <p style='padding-left:32px; padding-bottom:24px; margin:0px;'><b>Immigration support: <a href='globalimmigration@kyndryl.com'>globalimmigration@kyndryl.com</a></b></p>
                                  <p style='padding-left:32px; padding-bottom:24px; margin:0px;'><b>Posted worker compliance support : <a href='globalimmigration@kyndryl.com'>globalimmigration@kyndryl.com</a></b></p>
                                  <p style='padding-left:32px; padding-bottom:24px; margin:0px;'><b>Tax support : <a href='globalmobilitytax@kyndryl.com'>globalmobilitytax@kyndryl.com</a></b></p>
                               </td>
                               </tr>
                               </td>
                               </tr>
                               </table>
                               </body>
                               </html>    
                        """.format(ticket_number=body_data['ticket_number'],
                                   employee_name=body_data['employee_name'],
                                   employee_name_last=body_data['employee_name_last'],
                                   employee_cnum=body_data['employee_cnum'],
                                   employee_email=body_data['employee_email'],
                                   nationality=body_data['nationality'],
                                   cbta_status=body_data['cbta_status'],
                                   home_country=body_data['home_country'],
                                   destination_country=body_data['destination_country'],
                                   start_date=body_data['start_date'],
                                   end_date=body_data['end_date'],
                                   query_type=body_data['query_type'],
                                   query_description=body_data['query_description'],
                                   residency_status=body_data['residency_status'],
                                   residency_details=body_data['residency_details'],
                                   assessment_id=body_data['assessment_id'],
                                   assessment_link=body_data['assessment_link'],
                                   tool_image_link=body_data['tool_image_link']),
                "CBT - Trip query - New Assessment Request - {assessment_id}".format(
                    assessment_id=body_data['assessment_id'])]
        return data


    if session['employeetype'] != 'NEWCO':
        # 1. Return mail IBM requester filled
        data = ["""\
                <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
                               <html xmlns='http://www.w3.org/1999/xhtml'>
                               <head>
                                   <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
                                   <title>Demystifying Email Design</title>
                                   <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
                               </head>
                               <body bgcolor='#e0e0e0' align='left'>
                               <table width='620' bgcolor='#FFFFFF' cellspacing='0' cellpadding='3' border='0' align='center' style='font-family:Arial; font-size:16px'>
                                   <tr>
                                       <td width='620' bgcolor='#000000' valign='top'>
                                      <table width="100%">
                                        <tr>
                                          <td width="25%"><img src="{tool_image_link}logo-apro_email.png" border="0"></td>
                                          <td width="50%" align="center" style="color: white;">HR Global Mobility</td>
                                          <td width="25%" align="right"><img src="{tool_image_link}ibm_logo_email.png" border="0"></td>
                                        </tr>
                                      </table>
                                       </td>
                                  </tr>
                                  <tr>
                                   <td width='620' align='center' style='padding-bottom:24px;'>
                                       <img src='{tool_image_link}banner-v1.4.png' border='0' width="620px">
                               </td>
                               </tr>
                               <tr style='font-size:14px;'>
                                   <td width='620' valign='top' style='padding-left: 12px; padding-right: 8px;'>
                                         <font face='Arial';>
                                      <p
                                        style='margin:0px; font-size: 28px; padding-bottom:12px; padding-right:32px; padding-left:32px; padding-top:24px; padding-right:32px'>
                                          Dear <b>{employee_name}</b>,</p>
                                   <p
                                        style='margin:0px; font-size: 14px; padding-right:32px; padding-left:32px; padding-top:48px;'>
                                        Thank you for reaching out to the Cross Border Travel team. Your request has been received and is being reviewed by our support staff, <b>please allow the team 1 business day to respond.</b></p>
                                             <p style='margin:0px; font-size: 14px; padding-right:32px; padding-left:32px; padding-top:48px; padding-bottom:32px;'>Request/Ticket No: <b>{ticket_number}</b></p>
                                         </font>
                                  <p style='color: #c6c6c6; margin-left: 32px; margin-right: 32px; border-bottom: 1px solid;'></p>
                                  <p style='padding-left:32px; padding-top:72px; padding-bottom:36px; margin:0px; font-size: 28px;'>Request <b>Summary</b></p>
                                  <p style='padding-left:32px; margin-top:0px; padding-bottom:24px; margin:0px; font-size: 16px;'> <b>Request Details</b><br><br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Employee Name:</b> {employee_name} {employee_name_last}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Employee CNUM:</b> {employee_cnum}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Email ID:</b> {employee_email}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Nationality:</b> {nationality}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;CBTA Status:</b> {cbta_status}<br></p>
                                  <p style='padding-left:32px; margin-top:0px; padding-bottom:24px; margin:0px; font-size: 16px;'> <b>Trip Details</b><br><br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Origin Country/Location:</b> {home_country} <br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Destination Country/Location:</b> {destination_country}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Planned Start Date:</b> {start_date}<br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Planned End Date:</b> {end_date}<br></p>
                                  <p style='padding-left:32px; margin-top:0px; padding-bottom:24px; margin:0px; font-size: 16px;'> <b>Query Details</b><br><br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Type of Query:</b> {query_type} <br>
                                  <b>&nbsp;&nbsp;&nbsp;&nbsp;Query Description:</b> {query_description}<br></p>
                                  <p style='padding-left:32px; margin-top:0px; margin:0px; font-size: 16px;'> <b>Residential Status</b></p>
                                  <p style="padding-left:50px; padding-right:32px;"><b>Do you hold temporary/permanent work/residency status for the destination country or another country which you believe may impact your immigration requirements?</b> {residency_status} <br><br>
                                  <b>Details of temporary/permanent work/residency status (Country, Visa Type, Validity etc), related to the question above:</b> {residency_details}<br></p>
                                  <p style='color: #c6c6c6; margin-left: 32px; margin-right: 32px; padding-top:28px; border-bottom: 1px solid;'></p>
                                  <p style='padding-left:32px; padding-top:32px; padding-bottom:24px; margin:0px; font-size: 16px;'> You can review the request details <a href="{assessment_link}"><b>here</b></a>.</p>
                                  <p style='padding-left:32px; padding-right:32px; margin:0px; padding-bottom:24px; font-size: 16px;'> For more tips on Cross Border Travel Assessment and resource on the navigation of the tool click   <a href="https://w3.ibm.com/w3publisher/cbta"><b>here</b></a>.</p>
                                  <p style='padding-left:32px; padding-bottom:24px; margin:0px;'>Regards, <br><b>Global Mobility,</b></p>
                                  <p style='padding-left:32px; padding-bottom:24px; margin:0px;'><b>Immigration support: <a href='glosuppo@in.ibm.com'>glosuppo@in.ibm.com</a></b></p>
                                  <p style='padding-left:32px; padding-bottom:24px; margin:0px;'><b>Posted worker compliance support : <a href='PWDcompliance@in.ibm.com'>PWDcompliance@in.ibm.com</a></b></p>
                                  <p style='padding-left:32px; padding-bottom:24px; margin:0px;'><b>Tax support : <a href='bttctlr@in.ibm.com'>bttctlr@in.ibm.com</a></b></p>
                               </td>
                               </tr>
                               </td>
                               </tr>
                               </table>
                               </body>
                               </html>    
                        """.format(ticket_number=body_data['ticket_number'],
                                   employee_name=body_data['employee_name'],
                                   employee_name_last=body_data['employee_name_last'],
                                   employee_cnum=body_data['employee_cnum'],
                                   employee_email=body_data['employee_email'],
                                   nationality=body_data['nationality'],
                                   cbta_status=body_data['cbta_status'],
                                   home_country=body_data['home_country'],
                                   destination_country=body_data['destination_country'],
                                   start_date=body_data['start_date'],
                                   end_date=body_data['end_date'],
                                   query_type=body_data['query_type'],
                                   query_description=body_data['query_description'],
                                   residency_status=body_data['residency_status'],
                                   residency_details=body_data['residency_details'],
                                   assessment_id=body_data['assessment_id'],
                                   assessment_link=body_data['assessment_link'],
                                   tool_image_link=body_data['tool_image_link']),
                "CBT - Trip query - New Assessment Request - {assessment_id}".format(
                    assessment_id=body_data['assessment_id'])]
        return data