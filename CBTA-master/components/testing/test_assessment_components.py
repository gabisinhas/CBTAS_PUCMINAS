import components.model.assessment as assessment


def test_add_assessment():
    # 1. define object
    test_object = {
        "employee_id": "099541631",
        "employee_first_name": "Tarcisio",
        "business_unit": "CIO"
    }

    # 2. Assert function
    assert assessment.add_assessment(assessment=test_object)[0] == 200


test_add_assessment()