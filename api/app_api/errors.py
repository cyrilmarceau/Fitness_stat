import logging

from enum import Enum

logger = logging.getLogger(__name__)


class SuccessValue(Enum):
    SUCCESS = True
    ERROR = False


class DetailsResponse:
    """ Return a representation for detail
        "details": {
            "message": "Unable to log in with provided credentials.",
            "internal_code": "invalid",
            "status_code": 400
        } """

    def __init__(self, full_details=None, status_code=None):
        for detail in full_details:
            self.message = detail['message']
            self.code = detail['code']

        self.status_code = status_code

    def to_json(self):
        return self.__dict__


class ErrorResponse:
    """ Return a representation for error with details and success
        "details": {
            "message": "Unable to log in with provided credentials.",
			"internal_code": "invalid",
			"status_code": 400
		},
		"success": False
    """

    def __init__(self, is_success: Enum, details: DetailsResponse):
        self.is_success = is_success.value
        self.details = details

    def to_json(self):
        return self.__dict__
