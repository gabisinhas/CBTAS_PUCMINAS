import requests


def test_add_assessment():

    assessment_to_add = {
        "name": "Gabriela"
    }
    request_result = requests.post('http://localhost:8080/assessment_management/cbta/', data=assessment_to_add)

    print(request_result.status_code)

    print(request_result.headers)

    print(request_result.encoding)

    print(request_result.text)

    print(request_result.json())


test_add_assessment()