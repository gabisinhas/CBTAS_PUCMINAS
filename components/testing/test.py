import unittest
import components.model.assessment as assessment

class MyTestCase(unittest.TestCase):
    def test_something(self):
        self.assertEqual(True, False)  # add assertion here

    # 2. Assert function
    assert assessment.add_assessment(assessment=test_object)[0] == 200

if __name__ == '__main__':
    unittest.main()
