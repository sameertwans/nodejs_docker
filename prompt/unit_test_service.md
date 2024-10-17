## Objective
Write comprehensive unit tests using Jest for all existing methods in the service layer. Ensure that the service's methods are tested in isolation from the controller and other dependencies using mock objects. Remember all existing methods in active service.

## Mock Dependencies:
- Repository Layer: The repository methods will be mocked, as we don't want to interact with the real database in unit tests for services.
- Other dependencies: Mock any other dependencies used by the controller (e.g. base service, configuration, logging)

## Test Scenario: 
For each method in the service layer, perform the following steps:
- Test the happy path where the operation succeeds
- Verify the correct status code (e.g., 200 for GET, 201 for POST)
- Check that the response body contains the expected data
- Test with missing required fields
- Test with invalid data types
- Verify appropriate error responses (e.g., 400 Bad Request)
- Test cases where the requested resource doesn't exist
- Verify 404 Not Found responses
- Test how the controller handles unexpected errors from the service layer
- Verify 500 Internal Server Error responses
- Test scenarios with missing or invalid authorization
- Verify 401 Unauthorized or 403 Forbidden responses
