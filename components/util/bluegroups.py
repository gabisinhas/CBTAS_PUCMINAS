import requests
import json
import xml.etree.ElementTree as et

__author__ = "Tarcisio Franco de Carvalho"
__copyright__ = "Copyright 2020, IBM"
__license__ = "Apache"
__version__ = "0.1"
__email__ = "tfc@br.ibm.com"
__status__ = "Beta"


def isInAGroup(email=None, group=None):
    ''' 
        This function queries the bluegroup API via person email and group name to verify if the user is a member of a given group. The result will be True or False 
            <group>
                <request>inAGroup</request>
                <groupName>HRMobCMTeam</groupName>
                <member>tfc@br.ibm.com</member>
                <rc>0</rc>
                <msg>Success</msg>
            </group>
    
    '''

    if email and group:
        # --- Bluepages API URL definition --- #
        url = 'https://bluepages.ibm.com/tools/groups/groupsxml.wss?task=inAGroup&email=' + email + '&group=' + group

        # --- Call the Bluepages API --- #
        resp = requests.request(
            method='GET',
            url=url,
            verify=False,
        )

        # --- Parsing response --- #
        tree = et.fromstring(resp.text)
        for child in tree.iter('*'):
            if child.tag == "member":
                if child.text == email:
                    return True
    return False


def getMembers(group=None):
    ''' 
        This function queries the bluegroup API via group name and return group members email. In case of no member the result will be [] 
            <group>
                <request>inAGroup</request>
                <groupName>HRMobCMTeam</groupName>
                <member>tfc@br.ibm.com</member>
                <rc>0</rc>
                <msg>Success</msg>
            </group>
    
    '''

    if group:
        # --- Bluepages API URL definition --- #
        url = 'https://bluepages.ibm.com/tools/groups/groupsxml.wss?task=listMembers&group=' + group

        # --- Call the Bluepages API --- #
        resp = requests.request(
            method='GET',
            url=url,
            verify=False,
        )

        # --- Parsing response --- #
        tree = et.fromstring(resp.text)
        members = []
        for child in tree.iter('*'):
            if child.tag == "member":
                members.append(child.text)

    return members

# print(isInAGroup("tfc@br.ibm.com","HRMobCMTeam"))
# print(getMembers("HRMobCMTeam"))
