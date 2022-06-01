import components.model.assessment as assessment

def test_add_assessment():
    # 1. define object
    test_object = {
        "nome": "Gabriela",
        "business_unit": "CIO"
    }

    # 2. Assert function
    assert assessment.add_assessment(assessment=test_object)[0] == 200

test_add_assessment()
