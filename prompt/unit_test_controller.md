## Objective
Unit Test For Class: SampleController (extends BaseController)
Write comprehensive unit tests using Jest for all existing methods in the controller layer. Ensure that the controller's methods are tested in isolation from the service layer and other dependencies using mock objects. Remember all existing methods in active controller.

## Import: 
- Import required modules – Import the necessary controller, services, and helpers for the specific controller.

## Mock Dependencies:
- Use jest.mock to mock services and helper functions related to the new controller.
- Service Layer (mandatory) : All the service methods should be mocked, as we don't want to interact with the real business logic in unit tests for controllers.
- Request and Response objects (mandatory) : Use Jest's mock functions to create req and res objects
- Other dependencies (optional) : Mock any other dependencies used by the controller if used in the controller like base controller, base service, transformers, configuration, logging.

## Sample Source Code: 
// Import the required modules
const SampleController = require('controller_path');
const SampleTransformer = require('transformer_path');
const { generatePdf } = require('helper_path');
const { hasEmptyOrUndefinedValues } = require('helper_path');
const { NOT_FOUND } = require('backend-cms/src/constants/messages');

// Mock dependencies
jest.mock('base_controller_path');
jest.mock('helper_path');
jest.mock('transformer_path');`

describe('SampleController', () => {
  let controller;
  let mockSampleService;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockSampleService = {
      methodName: jest.fn(),
      // ... other methods
    };

    mockReq = {
      flash: jest.fn(),
      query: {},
      params: {},
      body: {},
    };

    mockRes = {
      render: jest.fn(),
      redirect: jest.fn(),
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      attachment: jest.fn(),
      setHeader: jest.fn(),
    };

    controller = new SampleController({ sampleService: mockSampleService });
    controller.viewData = jest.fn().mockReturnValue({});
    controller.indexBreadCrumb = jest.fn().mockReturnValue([]);
  });

  describe('methodName', () => {
    it('should handle successful case', async () => {
      // Arrange
      mockReq.params = { /* ... */ };
      mockE1Service.methodName.mockResolvedValue({ /* ... */ });

      // Act
      await controller.methodName(mockReq, mockRes);

      // Assert
      expect(mockE1Service.methodName).toHaveBeenCalledWith(/* ... */);
      expect(mockRes.status).toHaveBeenCalledWith(/* ... */);
      expect(mockRes.json).toHaveBeenCalledWith(/* ... */);
    });

    it('should handle error case', async () => {
      // Arrange
      mockReq.params = { /* ... */ };
      mockE1Service.methodName.mockRejectedValue(new Error('Some error'));

      // Act
      await controller.methodName(mockReq, mockRes);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(/* ... */);
      expect(mockRes.json).toHaveBeenCalledWith(/* ... */);
    });

    // Additional test cases...
  });
  
});




## Test Scenario: 


