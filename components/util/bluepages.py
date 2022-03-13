import requests
import json
import urllib3
from flask import session

__author__ = "Tarcisio Franco de Carvalho"
__copyright__ = "Copyright 2020, IBM"
__license__ = "Apache"
__version__ = "0.2"
__email__ = "tfc@br.ibm.com"
__status__ = "Beta"

urllib3.disable_warnings()


# =================================================================================================================
# =================================================================================================================
def get_person_data_via_serial_9(serial_9=None):
    '''
        This function queries the bluepages API via person email and return a raw person data as the example below. In case of no data, the result will be None
        { "search": { "entry": [
            { "dn": "uid=099541631,c=br,ou=bluepages,o=ibm.com",
            "attribute": [
            { "name": "alternatenode", "value": [ "LAVM1" ] },
            { "name": "tieline", "value": [ "733-7073" ] },
            { "name": "preferredfirstname", "value": [ "Tarcisio" ] },
            { "name": "mail", "value": [ "tfc@br.ibm.com" ] },
            { "name": "uid", "value": [ "099541631" ] },
            { "name": "workplaceindicator", "value": [ "S" ] },
            { "name": "preferredlastname", "value": [ "Franco de Carvalho" ] },
            { "name": "managerserialnumber", "value": [ "011235" ] },
            { "name": "worklocation", "value": [ "workLoc=BMM,ou=bluepages,o=ibm.com" ] },
            { "name": "directoryalias", "value": [ "WORKDAY" ] },
            { "name": "notesemail", "value": [ "CN=Tarcisio Franco de Carvalho/OU=Brazil/O=IBM@IBMMail" ] },
            { "name": "objectclass", "value": [ "person", "organizationalPerson", "ibmPerson", "ePerson", "top" ] },
            { "name": "employeecountrycode", "value": [ "631" ] },
            { "name": "sn", "value": [ "Franco de Carvalho" ] },
            { "name": "hrorganizationcode", "value": [ "0C" ] },
            { "name": "serialnumber", "value": [ "099541631" ] },
            { "name": "ibmloc", "value": [ "BMM" ] },
            { "name": "telephonenumber", "value": [ "55-19-2119-7073" ] },
            { "name": "preferredidentity", "value": [ "tfc@br.ibm.com" ] },
            { "name": "managercountrycode", "value": [ "631" ] },
            { "name": "primarynode", "value": [ "IBMMAIL" ] },
            { "name": "jobresponsibilities", "value": [ "Application Developer" ] },
            { "name": "ibmserialnumber", "value": [ "099541" ] },
            { "name": "co", "value": [ "Brazil" ] },
            { "name": "cn", "value": [ "Tarcisio Franco de Carvalho" ] },
            { "name": "workloc", "value": [ "BMM" ] },
            { "name": "ou", "value": [ "bluepages" ] },
            { "name": "dept", "value": [ "RWHR05" ] },
            { "name": "entrytype", "value": [ "workday" ] },
            { "name": "mobile", "value": [ "55-19-8118-2745" ] },
            { "name": "callupname", "value": [ "Franco de Carvalho, Tarcisio" ] },
            { "name": "buildingname", "value": [ "10" ] },
            { "name": "givenname", "value": [ "Tarcisio" ] },
            { "name": "ismanager", "value": [ "N" ] },
            { "name": "divdept", "value": [ "dept=RWHR05,div=02,ou=bluepages,o=ibm.com" ] },
            { "name": "employeetype", "value": [ "P" ] },
            { "name": "o", "value": [ "ibm.com" ] },
            { "name": "primaryuserid", "value": [ "TFC" ] },
            { "name": "div", "value": [ "02" ] },
            { "name": "c", "value": [ "br" ] },
            { "name": "manager", "value": [ "uid=011235631,c=br,ou=bluepages,o=ibm.com" ] },
            { "name": "alternateuserid", "value": [ "BR99541" ] }]
            }
            ],
            "return": {
            "code": 0,
            "message": "Success",
            "count": 1
            }
        } }

    '''

    # Validate the parameters
    if serial_9 == None or len(str(serial_9)) != 9:  # If is an invalid serial
        return None

    # 1. URL definition
    url = 'https://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/%28serialNumber=' + serial_9 + '*%29/.list/byjson'

    # 2. Call BluePages
    resp = requests.request(
        method='GET',
        url=url,
        verify=False,
    )

    # 3. Parse response
    data = json.loads(resp.text)

    # 4. Response preparation
    person_data = {}
    if data['search']["return"]["count"] >= 1:
        for x in data['search']['entry'][0]['attribute']:
            # x = json.loads(x)
            person_data[x['name']] = x['value'][0]

        # 5. Respond with the person data
        return person_data

    # 6. Or respond with nothing
    # Could return {'serial_9': ''}
    return None


# =================================================================================================================
# =================================================================================================================
def get_person_data_via_email(email=None, country_code=None):
    '''
        This function queries the bluepages API via person email and return a raw person data as the example below. In case of no data, the result will be None
        { "search": { "entry": [
            { "dn": "uid=099541631,c=br,ou=bluepages,o=ibm.com",
            "attribute": [
            { "name": "alternatenode", "value": [ "LAVM1" ] },
            { "name": "tieline", "value": [ "733-7073" ] },
            { "name": "preferredfirstname", "value": [ "Tarcisio" ] },
            { "name": "mail", "value": [ "tfc@br.ibm.com" ] },
            { "name": "uid", "value": [ "099541631" ] },
            { "name": "workplaceindicator", "value": [ "S" ] },
            { "name": "preferredlastname", "value": [ "Franco de Carvalho" ] },
            { "name": "managerserialnumber", "value": [ "011235" ] },
            { "name": "worklocation", "value": [ "workLoc=BMM,ou=bluepages,o=ibm.com" ] },
            { "name": "directoryalias", "value": [ "WORKDAY" ] },
            { "name": "notesemail", "value": [ "CN=Tarcisio Franco de Carvalho/OU=Brazil/O=IBM@IBMMail" ] },
            { "name": "objectclass", "value": [ "person", "organizationalPerson", "ibmPerson", "ePerson", "top" ] },
            { "name": "employeecountrycode", "value": [ "631" ] },
            { "name": "sn", "value": [ "Franco de Carvalho" ] },
            { "name": "hrorganizationcode", "value": [ "0C" ] },
            { "name": "serialnumber", "value": [ "099541631" ] },
            { "name": "ibmloc", "value": [ "BMM" ] },
            { "name": "telephonenumber", "value": [ "55-19-2119-7073" ] },
            { "name": "preferredidentity", "value": [ "tfc@br.ibm.com" ] },
            { "name": "managercountrycode", "value": [ "631" ] },
            { "name": "primarynode", "value": [ "IBMMAIL" ] },
            { "name": "jobresponsibilities", "value": [ "Application Developer" ] },
            { "name": "ibmserialnumber", "value": [ "099541" ] },
            { "name": "co", "value": [ "Brazil" ] },
            { "name": "cn", "value": [ "Tarcisio Franco de Carvalho" ] },
            { "name": "workloc", "value": [ "BMM" ] },
            { "name": "ou", "value": [ "bluepages" ] },
            { "name": "dept", "value": [ "RWHR05" ] },
            { "name": "entrytype", "value": [ "workday" ] },
            { "name": "mobile", "value": [ "55-19-8118-2745" ] },
            { "name": "callupname", "value": [ "Franco de Carvalho, Tarcisio" ] },
            { "name": "buildingname", "value": [ "10" ] },
            { "name": "givenname", "value": [ "Tarcisio" ] },
            { "name": "ismanager", "value": [ "N" ] },
            { "name": "divdept", "value": [ "dept=RWHR05,div=02,ou=bluepages,o=ibm.com" ] },
            { "name": "employeetype", "value": [ "P" ] },
            { "name": "o", "value": [ "ibm.com" ] },
            { "name": "primaryuserid", "value": [ "TFC" ] },
            { "name": "div", "value": [ "02" ] },
            { "name": "c", "value": [ "br" ] },
            { "name": "manager", "value": [ "uid=011235631,c=br,ou=bluepages,o=ibm.com" ] },
            { "name": "alternateuserid", "value": [ "BR99541" ] }]
            }
            ],
            "return": {
            "code": 0,
            "message": "Success",
            "count": 1
            }
        } }

    '''
    # Validate the parameters
    if email == None or "@" not in email or "ibm.com" not in email:  # If is an invalid email
        return None

    # 1. Setup the Bluepages API URL
    if country_code:
        url = 'https://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/&(mail={0})(employeecountrycode={1})/.list/byjson'.format(
            email, country_code)
    else:
        url = 'https://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/%28mail={0}*%29/.list/byjson'.format(email)

    # 2. Call the Bluepages API
    resp = requests.request(
        method='GET',
        url=url,
        verify=False,
    )

    # 3. Parsing response from BluePages
    data = json.loads(resp.text)

    # 4. Response preparation
    person_data = {}
    if data['search']["return"]["count"] >= 1:
        for x in data['search']['entry'][0]['attribute']:
            person_data[x['name']] = x['value'][0]

        # 5. Respond with the person data
        return person_data

    # 6. Or respond with nothing
    # Could  return {'email': ''}
    return None


# =================================================================================================================
# =================================================================================================================
def get_manager_employees_via_serial_country(serial=None, country_code="897"):
    list_of_employees = []
    person_data = {}

    # Validate the parameters
    if serial == None or len(str(serial)) != 6:  # If is an invalid serial
        return None

    if not country_code:
        return None

    # 1. Setup the Bluepages API URL
    url1 = 'https://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/&(managerserialnumber='  # + serial
    url2 = ')(managercountrycode='  # + country_code
    url3 = ')/.list/byjson'

    url = url1 + str(serial) + url2 + str(country_code) + url3

    # 2. Call the BluePages API
    resp = requests.request(
        method='GET',
        url=url,
        verify=False,
    )

    # 3. Parsing response from BluePages
    data = json.loads(resp.text)

    # 4. Response preparation
    count = data['search']['return']['count']
    if count >= 1:
        for n in range(count):
            person_data = {}
            for x in data['search']['entry'][n]['attribute']:
                person_data[x['name']] = x['value'][0]

            if person_data['employeetype'] == 'P':
                list_of_employees.append(person_data)

    # 5. Respond with the list of employees
    return list_of_employees


# =================================================================================================================
# =================================================================================================================
def get_manager_email_callupname_via_employee_email(email=None):
    # Validate the parameters
    if email == None or "@" not in email or "ibm.com" not in email:  # If is an invalid email
        return None

    # 1. Get the employee's person data from BluePages
    # --------------------------------------------
    person_data = get_person_data_via_email(email)
    # --------------------------------------------

    # 2. Check if there is valid data
    if person_data == None:
        return None

    # 3. Composing the 9 characters serial number
    manager_serial_9 = person_data['managerserialnumber'] + person_data['managercountrycode']

    # 4. Get the manager's person data from BluePages
    # -----------------------------------------------------------
    manager_data = get_person_data_via_serial_9(manager_serial_9)
    # -----------------------------------------------------------

    # 5. Check if there is valid data
    if manager_data == None:
        return None

    # 6. Respond with the email of the emplyee's manager
    return [manager_data['mail'], manager_data['callupname']]


# =================================================================================================================
# =================================================================================================================
def is_manager_with_flag(email=None, country_code=None):
    # Validate the parameters
    if email is None or "@" not in email or "ibm.com" not in email:  # If is an invalid email
        return [None, None]

    # 1. Get the person data from BluePages
    # -------------------------------------------
    person_data = get_person_data_via_email(email, country_code)
    # -------------------------------------------

    # 2. Check if there is valid data
    if person_data is None:
        return [None, None]

    # 3. If the person is a people manager in BluePages, then respond with his/her data
    if person_data['ismanager'] == "Y":
        return [True, person_data]

    return [False, None]


# =================================================================================================================
# =================================================================================================================
def is_manager_with_employee(email=None, country_code=None):
    # Validate the parameters
    if email is None or "@" not in email or "ibm.com" not in email:  # If is an invalid email
        return None

    # 1. Get the person data from BluePages
    # -----------------------------------------------------
    obj = is_manager_with_flag(email, country_code)
    # -----------------------------------------------------

    # 2. Check if there is valid data
    if obj is None:
        return [None, None]

    is_manager = obj[0]

    # 3. Check if the person is a People Manager
    if not is_manager:
        return [False, None]

    # 4. Use the data from the returned response...
    person_data = obj[1]

    # 5. ... to get the list of employees for that manager
    # -------------------------------------------------------------------------------------------------------------------------
    list_of_employees = get_manager_employees_via_serial_country(person_data['ibmserialnumber'],
                                                                 person_data['employeecountrycode'])
    # -------------------------------------------------------------------------------------------------------------------------

    # 6. And respond with the number of employees
    if len(list_of_employees) > 1:
        return [True, list_of_employees]
    else:
        return [False, None]


# =================================================================================================================
# =================================================================================================================
def get_organizaton_data_via_org_code(org_code=None):
    # Validate the parameters
    if not org_code:
        return None

    # 1. Setup the Bluepages API URL
    url = 'https://w3.api.ibm.com/common/run/bluepages/slaphapi/ibmorganization/HrOrganizationCode=' + org_code + '.list/byjson/*?client_id=6007a792-abef-447b-8873-1196be847273'

    # 2. Call the Bluepages API
    resp = requests.request(
        method='GET',
        url=url,
        verify=False,
    )

    # 3. Parsing response from BluePages
    data = json.loads(resp.text)

    # 4. Response preparation
    org_data = {}
    if data['search']["return"]["count"] >= 1:
        for x in data['search']['entry'][0]['attribute']:
            # x = json.loads(x)
            org_data[x['name']] = x['value'][0]

        # 5. Respond with the list, if any
        return org_data

    # 6. Or respond with nothing
    # Could be return {'hrOrganizationDisplay': ''}
    return None


def get_person_callupname_via_email(email=None, country_code=None):
    '''
        This function queries the bluepages API via person email and return a raw person data as the example below. In case of no data, the result will be None
        { "search": { "entry": [
            { "dn": "uid=099541631,c=br,ou=bluepages,o=ibm.com",
            "attribute": [
            { "name": "alternatenode", "value": [ "LAVM1" ] },
            { "name": "tieline", "value": [ "733-7073" ] },
            { "name": "preferredfirstname", "value": [ "Tarcisio" ] },
            { "name": "mail", "value": [ "tfc@br.ibm.com" ] },
            { "name": "uid", "value": [ "099541631" ] },
            { "name": "workplaceindicator", "value": [ "S" ] },
            { "name": "preferredlastname", "value": [ "Franco de Carvalho" ] },
            { "name": "managerserialnumber", "value": [ "011235" ] },
            { "name": "worklocation", "value": [ "workLoc=BMM,ou=bluepages,o=ibm.com" ] },
            { "name": "directoryalias", "value": [ "WORKDAY" ] },
            { "name": "notesemail", "value": [ "CN=Tarcisio Franco de Carvalho/OU=Brazil/O=IBM@IBMMail" ] },
            { "name": "objectclass", "value": [ "person", "organizationalPerson", "ibmPerson", "ePerson", "top" ] },
            { "name": "employeecountrycode", "value": [ "631" ] },
            { "name": "sn", "value": [ "Franco de Carvalho" ] },
            { "name": "hrorganizationcode", "value": [ "0C" ] },
            { "name": "serialnumber", "value": [ "099541631" ] },
            { "name": "ibmloc", "value": [ "BMM" ] },
            { "name": "telephonenumber", "value": [ "55-19-2119-7073" ] },
            { "name": "preferredidentity", "value": [ "tfc@br.ibm.com" ] },
            { "name": "managercountrycode", "value": [ "631" ] },
            { "name": "primarynode", "value": [ "IBMMAIL" ] },
            { "name": "jobresponsibilities", "value": [ "Application Developer" ] },
            { "name": "ibmserialnumber", "value": [ "099541" ] },
            { "name": "co", "value": [ "Brazil" ] },
            { "name": "cn", "value": [ "Tarcisio Franco de Carvalho" ] },
            { "name": "workloc", "value": [ "BMM" ] },
            { "name": "ou", "value": [ "bluepages" ] },
            { "name": "dept", "value": [ "RWHR05" ] },
            { "name": "entrytype", "value": [ "workday" ] },
            { "name": "mobile", "value": [ "55-19-8118-2745" ] },
            { "name": "callupname", "value": [ "Franco de Carvalho, Tarcisio" ] },
            { "name": "buildingname", "value": [ "10" ] },
            { "name": "givenname", "value": [ "Tarcisio" ] },
            { "name": "ismanager", "value": [ "N" ] },
            { "name": "divdept", "value": [ "dept=RWHR05,div=02,ou=bluepages,o=ibm.com" ] },
            { "name": "employeetype", "value": [ "P" ] },
            { "name": "o", "value": [ "ibm.com" ] },
            { "name": "primaryuserid", "value": [ "TFC" ] },
            { "name": "div", "value": [ "02" ] },
            { "name": "c", "value": [ "br" ] },
            { "name": "manager", "value": [ "uid=011235631,c=br,ou=bluepages,o=ibm.com" ] },
            { "name": "alternateuserid", "value": [ "BR99541" ] }]
            }
            ],
            "return": {
            "code": 0,
            "message": "Success",
            "count": 1
            }
        } }

    '''
    # Validate the parameters
    if email == None or "@" not in email or "ibm.com" not in email:  # If is an invalid email
        return None

    # 1. Setup the Bluepages API URL
    if country_code:
        url = 'https://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/&(mail={0})(employeecountrycode={1})/.list/byjson'.format(
            email, country_code)
    else:
        url = 'https://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/%28mail={0}*%29/.list/byjson'.format(email)

    # 2. Call the Bluepages API
    resp = requests.request(
        method='GET',
        url=url,
        verify=False,
    )

    # 3. Parsing response from BluePages
    data = json.loads(resp.text)

    # 4. Response preparation
    person_data = {}
    if data['search']["return"]["count"] >= 1:
        for x in data['search']['entry'][0]['attribute']:
            person_data[x['name']] = x['value'][0]

        # 5. Respond with the person data
        return person_data['callupname']

    # 6. Or respond with nothing
    # Could  return {'email': ''}
    return None


def get_person_data_include_manager(email=None, serial_number=None):
    """This component validates the if the user is valid IBM
        employee and which roles can be assigned """

    person_data = None

    if email:
        # 1. Get person data by email
        person_data = get_person_data_via_email(email)

    if serial_number is not None and email is None:
        # 2. Get person data by serial number
        person_data = get_person_data_via_serial_9(serial_number)

    if person_data is None:
        # 3. Return none in case of none input
        return [204, [], None]
    if person_data['employeetype'].upper() == 'H' or person_data['employeetype'].upper() == 'C':
        name = person_data['callupname']
        mail = person_data['mail']
        serial_number = person_data['uid']
        first_name = person_data['givenname']
        last_name = person_data['sn']
        phone = person_data['telephonenumber'] if 'telephonenumber' in person_data else None
        manager_serial = person_data["manager"].split(',')[0].split('=')[1]
        manager_employee = get_person_data_via_serial_9(manager_serial)
        organization_details = get_organization_details(org_code=person_data["hrorganizationcode"])
        organization_name = organization_details["hrorganizationdisplay"] if "hrorganizationdisplay" in organization_details else "Not found"

    if person_data['employeetype'].upper() != 'H' and person_data['employeetype'].upper() != 'C':
        # 4. Define user blue pages profile
        name = person_data['callupname']
        mail = person_data['mail']
        serial_number = person_data['uid']
        first_name = person_data['preferredfirstname']
        last_name = person_data['preferredlastname']
        phone = person_data['telephonenumber'] if 'telephonenumber'in person_data else None
        manager_serial = person_data["manager"].split(',')[0].split('=')[1]
        manager_employee = get_person_data_via_serial_9(manager_serial)
        organization_details = get_organization_details(org_code=person_data["hrorganizationcode"])
        organization_name = organization_details["hrorganizationdisplay"] if "hrorganizationdisplay" in organization_details else "Not found"

    # 5. Define the result
    employee_data = {'name': name,
                     'serial_number': serial_number,
                     'mail': mail,
                     'phone': phone,
                     'first_name': first_name,
                     'last_name': last_name,
                     'manager_name': manager_employee['callupname'],
                     'manager_email': manager_employee['mail'],
                     'bus_unit': organization_name}
    return [200, employee_data]


def user_validation_via_serial(serial_9=None):
    """This component validates the if the user is valid IBM
        employee and which roles can be assigned """

    # 1. Validate if it is a valid IBM id
    person_data = get_person_data_via_serial_9(serial_9)
    if person_data is None:
        return [204, [], None]
    else:
        # 2. Define user blue pages profile
        name = person_data['callupname']
        mail = person_data['mail']
        serial_number = person_data['uid']
        phone = person_data['telephonenumber']
        first_name = person_data['preferredfirstname']
        last_name = person_data['preferredlastname']
        manager_serial_9 = person_data['managerserialnumber'] + person_data['managercountrycode']
        manager_employee = get_person_data_via_serial_9(manager_serial_9)

        # 3. Define the result
        employee_data = {'name': name,
                         'serial_number': serial_number,
                         'mail': mail,
                         'phone': phone,
                         'first_name': first_name,
                         'last_name': last_name,
                         'manager_name': manager_employee['callupname'],
                         'manager_email': manager_employee['email']}
        return [200, employee_data]

def get_organization_details(org_code=None):
    '''
        This function queries the bluepages API via person hrorganizationcode and return a organization data
        { "search": { "entry": [
        { "dn": "hrOrganizationCode=0C,ou=bluepages,o=ibm.com",
        "attribute": [
        { "name": "hrOrganizationDisplay", "value": [ "Finance and Operations" ] },
        { "name": "hrUnitId", "value": [ "CIO" ] },
        { "name": "hrOrganizationCode", "value": [ "0C" ] },
        { "name": "objectClass", "value": [ "ibmOrganization", "top" ] },
        { "name": "hrGroupId", "value": [ "F&O" ] }]
        }
        ],
        "return": {
        "code": 0,
        "message": "Success",
        "count": 1
        }
} }
    '''
    # Validate the parameters
    if org_code is None:
        return None
    # 1. URL definition
    url = 'http://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmorganization/hrorganizationcode=' + org_code + '/byjson?*'
    # 2. Call BluePages
    resp = requests.request(
        method='GET',
        url=url,
        verify=False,
    )
    # 3. Parse response
    data = json.loads(resp.text)
    # 4. Response preparation
    person_data = {}
    if data['search']["return"]["count"] >= 1:
        for x in data['search']['entry'][0]['attribute']:
            # x = json.loads(x)
            person_data[str(x['name']).lower()] = x['value'][0]
        # 5. Respond with the person data
        return person_data
    # 6. Or respond with nothing
    # Could return {'serial_9': ''}
    return None

def nameByEmployeeEmail(email=None):
    '''
        This function queries the bluepages API via person email and return a raw person data as the example below. In case of no data, the result will be None
        { "search": { "entry": [
            { "dn": "uid=099541631,c=br,ou=bluepages,o=ibm.com",
            "attribute": [
            { "name": "alternatenode", "value": [ "LAVM1" ] },
            { "name": "tieline", "value": [ "733-7073" ] },
            { "name": "preferredfirstname", "value": [ "Tarcisio" ] },
            { "name": "mail", "value": [ "tfc@br.ibm.com" ] },
            { "name": "uid", "value": [ "099541631" ] },
            { "name": "workplaceindicator", "value": [ "S" ] },
            { "name": "preferredlastname", "value": [ "Franco de Carvalho" ] },
            { "name": "managerserialnumber", "value": [ "011235" ] },
            { "name": "worklocation", "value": [ "workLoc=BMM,ou=bluepages,o=ibm.com" ] },
            { "name": "directoryalias", "value": [ "WORKDAY" ] },
            { "name": "notesemail", "value": [ "CN=Tarcisio Franco de Carvalho/OU=Brazil/O=IBM@IBMMail" ] },
            { "name": "objectclass", "value": [ "person", "organizationalPerson", "ibmPerson", "ePerson", "top" ] },
            { "name": "employeecountrycode", "value": [ "631" ] },
            { "name": "sn", "value": [ "Franco de Carvalho" ] },
            { "name": "hrorganizationcode", "value": [ "0C" ] },
            { "name": "serialnumber", "value": [ "099541631" ] },
            { "name": "ibmloc", "value": [ "BMM" ] },
            { "name": "telephonenumber", "value": [ "55-19-2119-7073" ] },
            { "name": "preferredidentity", "value": [ "tfc@br.ibm.com" ] },
            { "name": "managercountrycode", "value": [ "631" ] },
            { "name": "primarynode", "value": [ "IBMMAIL" ] },
            { "name": "jobresponsibilities", "value": [ "Application Developer" ] },
            { "name": "ibmserialnumber", "value": [ "099541" ] },
            { "name": "co", "value": [ "Brazil" ] },
            { "name": "cn", "value": [ "Tarcisio Franco de Carvalho" ] },
            { "name": "workloc", "value": [ "BMM" ] },
            { "name": "ou", "value": [ "bluepages" ] },
            { "name": "dept", "value": [ "RWHR05" ] },
            { "name": "entrytype", "value": [ "workday" ] },
            { "name": "mobile", "value": [ "55-19-8118-2745" ] },
            { "name": "callupname", "value": [ "Franco de Carvalho, Tarcisio" ] },
            { "name": "buildingname", "value": [ "10" ] },
            { "name": "givenname", "value": [ "Tarcisio" ] },
            { "name": "ismanager", "value": [ "N" ] },
            { "name": "divdept", "value": [ "dept=RWHR05,div=02,ou=bluepages,o=ibm.com" ] },
            { "name": "employeetype", "value": [ "P" ] },
            { "name": "o", "value": [ "ibm.com" ] },
            { "name": "primaryuserid", "value": [ "TFC" ] },
            { "name": "div", "value": [ "02" ] },
            { "name": "c", "value": [ "br" ] },
            { "name": "manager", "value": [ "uid=011235631,c=br,ou=bluepages,o=ibm.com" ] },
            { "name": "alternateuserid", "value": [ "BR99541" ] }]
            }
            ],
            "return": {
            "code": 0,
            "message": "Success",
            "count": 1
            }
        } }

    '''

    name = None

    # 1. Get employee name
    if email:
        # 1.1 URL definition
        url = 'https://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/%28mail=' + email + '*%29/.list/byjson'

        # 1.2 Call BluePages
        resp = requests.request(
            method='GET',
            url=url,
            verify=False,
        )

        # 1.3 Parse response
        data = json.loads(resp.text)

        # 1.4 Response preparation
        if data['search']["return"]["count"] >= 1:
            for x in data['search']['entry'][0]['attribute']:
                if x['name'].upper() == "cn".upper():
                    name = x['value'][0]
                    return name

    return None


def personDataBySerial(serial=None):

    if serial:
        # --- Bluepages API URL definition --- #
        url = 'https://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/%28serialNumber=' + serial + '*%29/.list/byjson'

        # --- Call the Bluepages API --- #
        resp = requests.request(
            method='GET',
            url=url,
            verify=False,
        )

        # --- Parsing response --- #
        data = json.loads(resp.text)

        personData = {}
        if data['search']["return"]["count"] >= 1:
            for x in data['search']['entry'][0]['attribute']:
                # x = json.loads(x)
                personData[x['name']] = x['value'][0]

            return personData

    return {'serialnumber':''}


def organizatonDataByOrgCode(org_code=None):

    if org_code:
        # --- Bluepages API URL definition --- #
        url = 'https://w3.api.ibm.com/common/run/bluepages/slaphapi/ibmorganization/HrOrganizationCode=' + org_code + '.list/byjson/*?client_id=6007a792-abef-447b-8873-1196be847273'

        # --- Call the Bluepages API --- #
        resp = requests.request(
            method='GET',
            url=url,
            verify=False,
        )

        # --- Parsing response --- #
        data = json.loads(resp.text)

        orgData = {}
        if data['search']["return"]["count"] >= 1:
            for x in data['search']['entry'][0]['attribute']:
                # x = json.loads(x)
                orgData[x['name']] = x['value'][0]

            return orgData

    return {'hrOrganizationDisplay':''}


def personDataByEmail(email=None):
    '''
        This function queries the bluepages API via person email and return a raw person data as the example below. In case of no data, the result will be None
        { "search": { "entry": [
            { "dn": "uid=099541631,c=br,ou=bluepages,o=ibm.com",
            "attribute": [
            { "name": "alternatenode", "value": [ "LAVM1" ] },
            { "name": "tieline", "value": [ "733-7073" ] },
            { "name": "preferredfirstname", "value": [ "Tarcisio" ] },
            { "name": "mail", "value": [ "tfc@br.ibm.com" ] },
            { "name": "uid", "value": [ "099541631" ] },
            { "name": "workplaceindicator", "value": [ "S" ] },
            { "name": "preferredlastname", "value": [ "Franco de Carvalho" ] },
            { "name": "managerserialnumber", "value": [ "011235" ] },
            { "name": "worklocation", "value": [ "workLoc=BMM,ou=bluepages,o=ibm.com" ] },
            { "name": "directoryalias", "value": [ "WORKDAY" ] },
            { "name": "notesemail", "value": [ "CN=Tarcisio Franco de Carvalho/OU=Brazil/O=IBM@IBMMail" ] },
            { "name": "objectclass", "value": [ "person", "organizationalPerson", "ibmPerson", "ePerson", "top" ] },
            { "name": "employeecountrycode", "value": [ "631" ] },
            { "name": "sn", "value": [ "Franco de Carvalho" ] },
            { "name": "hrorganizationcode", "value": [ "0C" ] },
            { "name": "serialnumber", "value": [ "099541631" ] },
            { "name": "ibmloc", "value": [ "BMM" ] },
            { "name": "telephonenumber", "value": [ "55-19-2119-7073" ] },
            { "name": "preferredidentity", "value": [ "tfc@br.ibm.com" ] },
            { "name": "managercountrycode", "value": [ "631" ] },
            { "name": "primarynode", "value": [ "IBMMAIL" ] },
            { "name": "jobresponsibilities", "value": [ "Application Developer" ] },
            { "name": "ibmserialnumber", "value": [ "099541" ] },
            { "name": "co", "value": [ "Brazil" ] },
            { "name": "cn", "value": [ "Tarcisio Franco de Carvalho" ] },
            { "name": "workloc", "value": [ "BMM" ] },
            { "name": "ou", "value": [ "bluepages" ] },
            { "name": "dept", "value": [ "RWHR05" ] },
            { "name": "entrytype", "value": [ "workday" ] },
            { "name": "mobile", "value": [ "55-19-8118-2745" ] },
            { "name": "callupname", "value": [ "Franco de Carvalho, Tarcisio" ] },
            { "name": "buildingname", "value": [ "10" ] },
            { "name": "givenname", "value": [ "Tarcisio" ] },
            { "name": "ismanager", "value": [ "N" ] },
            { "name": "divdept", "value": [ "dept=RWHR05,div=02,ou=bluepages,o=ibm.com" ] },
            { "name": "employeetype", "value": [ "P" ] },
            { "name": "o", "value": [ "ibm.com" ] },
            { "name": "primaryuserid", "value": [ "TFC" ] },
            { "name": "div", "value": [ "02" ] },
            { "name": "c", "value": [ "br" ] },
            { "name": "manager", "value": [ "uid=011235631,c=br,ou=bluepages,o=ibm.com" ] },
            { "name": "alternateuserid", "value": [ "BR99541" ] }]
            }
            ],
            "return": {
            "code": 0,
            "message": "Success",
            "count": 1
            }
        } }

    '''

    if email:
        # --- Bluepages API URL definition --- #
        url = 'https://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/%28mail=' + email + '*%29/.list/byjson'

        # --- Call the Bluepages API --- #
        resp = requests.request(
            method='GET',
            url=url,
            verify=False,
        )

        # --- Parsing response --- #
        data = json.loads(resp.text)

        personData = {}
        if data['search']["return"]["count"] >= 1:
            for x in data['search']['entry'][0]['attribute']:
                # x = json.loads(x)
                personData[x['name']] = x['value'][0]

            return personData

    return None


def get_custom_employee_blue_pages_query(query=None, fields=None):
    '''
        This function queries the bluepages ibmperson API via custom query and return all data or just the fields specified in the input
        { "search": { "entry": [
            { "dn": "uid=099541631,c=br,ou=bluepages,o=ibm.com",
            "attribute": [
            { "name": "alternatenode", "value": [ "LAVM1" ] },
            { "name": "tieline", "value": [ "733-7073" ] },
            { "name": "preferredfirstname", "value": [ "Tarcisio" ] },
            { "name": "mail", "value": [ "tfc@br.ibm.com" ] },
            { "name": "uid", "value": [ "099541631" ] },
            { "name": "workplaceindicator", "value": [ "S" ] },
            { "name": "preferredlastname", "value": [ "Franco de Carvalho" ] },
            { "name": "managerserialnumber", "value": [ "011235" ] },
            { "name": "worklocation", "value": [ "workLoc=BMM,ou=bluepages,o=ibm.com" ] },
            { "name": "directoryalias", "value": [ "WORKDAY" ] },
            { "name": "notesemail", "value": [ "CN=Tarcisio Franco de Carvalho/OU=Brazil/O=IBM@IBMMail" ] },
            { "name": "objectclass", "value": [ "person", "organizationalPerson", "ibmPerson", "ePerson", "top" ] },
            { "name": "employeecountrycode", "value": [ "631" ] },
            { "name": "sn", "value": [ "Franco de Carvalho" ] },
            { "name": "hrorganizationcode", "value": [ "0C" ] },
            { "name": "serialnumber", "value": [ "099541631" ] },
            { "name": "ibmloc", "value": [ "BMM" ] },
            { "name": "telephonenumber", "value": [ "55-19-2119-7073" ] },
            { "name": "preferredidentity", "value": [ "tfc@br.ibm.com" ] },
            { "name": "managercountrycode", "value": [ "631" ] },
            { "name": "primarynode", "value": [ "IBMMAIL" ] },
            { "name": "jobresponsibilities", "value": [ "Application Developer" ] },
            { "name": "ibmserialnumber", "value": [ "099541" ] },
            { "name": "co", "value": [ "Brazil" ] },
            { "name": "cn", "value": [ "Tarcisio Franco de Carvalho" ] },
            { "name": "workloc", "value": [ "BMM" ] },
            { "name": "ou", "value": [ "bluepages" ] },
            { "name": "dept", "value": [ "RWHR05" ] },
            { "name": "entrytype", "value": [ "workday" ] },
            { "name": "mobile", "value": [ "55-19-8118-2745" ] },
            { "name": "callupname", "value": [ "Franco de Carvalho, Tarcisio" ] },
            { "name": "buildingname", "value": [ "10" ] },
            { "name": "givenname", "value": [ "Tarcisio" ] },
            { "name": "ismanager", "value": [ "N" ] },
            { "name": "divdept", "value": [ "dept=RWHR05,div=02,ou=bluepages,o=ibm.com" ] },
            { "name": "employeetype", "value": [ "P" ] },
            { "name": "o", "value": [ "ibm.com" ] },
            { "name": "primaryuserid", "value": [ "TFC" ] },
            { "name": "div", "value": [ "02" ] },
            { "name": "c", "value": [ "br" ] },
            { "name": "manager", "value": [ "uid=011235631,c=br,ou=bluepages,o=ibm.com" ] },
            { "name": "alternateuserid", "value": [ "BR99541" ] }]
            }
            ],
            "return": {
            "code": 0,
            "message": "Success",
            "count": 1
            }
        } }
    '''
    # Validate the parameters
    if filter is None:
        return None
    # 1. Setup the Bluepages API URL
    url = 'https://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/{query}/.list/byjson?{fields}'.format(query=query, fields=fields)
    # 2. Call the Bluepages API
    resp = requests.request(
        method='GET',
        url=url,
        verify=False,
    )
    # 3. Parsing response from BluePages
    data = json.loads(resp.text)
    # 4. Response preparation
    count = data['search']['return']['count']
    person_data = []
    if count >= 1:
        for n in range(count):
            for x in data['search']['entry'][n]['attribute']:
                person_data.append({x['name']: x['value'][0]})
        # 5. Respond with the person data
        return person_data
    # 6. Or respond with nothing
    return None