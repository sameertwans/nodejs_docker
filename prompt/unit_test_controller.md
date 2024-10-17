## Objective
Write comprehensive unit tests using Jest for all existing methods in the controller layer. Ensure that the controller's methods are tested in isolation from the service layer and other dependencies using mock objects. Remember all existing methods in active controller.

## Mock Dependencies:
- Service Layer: The service methods will be mocked, as we don't want to interact with the real business logic in unit tests for controllers.
- Request and Response objects: Use Jest's mock functions to create req and res objects
- Other dependencies: Mock any other dependencies used by the controller (e.g., base controller, base service, configuration, logging)

## Test Scenario: 
For each method in the controller layer, perform the following steps:
1. Successful operation
   - Test the happy path where the operation succeeds
   - Verify the correct status code (e.g., 200 for GET, 201 for POST)
   - Check that the response body contains the expected data

2. Invalid input
   - Test with missing required fields
   - Test with invalid data types
   - Verify appropriate error responses (e.g., 400 Bad Request)

3. Not found scenarios
   - Test cases where the requested resource doesn't exist
   - Verify 404 Not Found responses

4. Server error handling
   - Test how the controller handles unexpected errors from the service layer
   - Verify 500 Internal Server Error responses

5. Authorization (if applicable)
   - Test scenarios with missing or invalid authorization
   - Verify 401 Unauthorized or 403 Forbidden responses



