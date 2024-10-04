const roomController = require('../controllers/roomController');
const RoomService = require('../services/roomService');

jest.mock('../services/roomService');

// Add this at the top of your test file, after the other mocks
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('RoomController', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      params: {},
      body: {},
      query: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllRooms', () => {
    it('should return all rooms successfully', async () => {
      const mockRooms = [{ id: 1, name: 'Room 1' }, { id: 2, name: 'Room 2' }];
      RoomService.prototype.getAllRooms.mockResolvedValue(mockRooms);

      await roomController.getAllRooms(mockRequest, mockResponse);

      expect(RoomService.prototype.getAllRooms).toHaveBeenCalledWith(mockRequest.query);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockRooms);
    });

    it('should handle errors when getting all rooms', async () => {
      const error = new Error('Database error');
      RoomService.prototype.getAllRooms.mockRejectedValue(error);

      await roomController.getAllRooms(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
      // Add this line to check if the error is logged
      expect(console.error).toHaveBeenCalledWith(error);
    });
  });

  describe('getRoomById', () => {
    it('should return a room by id successfully', async () => {
      const mockRoom = { id: 1, name: 'Room 1' };
      mockRequest.params.id = '1';
      RoomService.prototype.getRoomById.mockResolvedValue(mockRoom);

      await roomController.getRoomById(mockRequest, mockResponse);

      expect(RoomService.prototype.getRoomById).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockRoom);
    });

    it('should return 404 when room is not found', async () => {
      mockRequest.params.id = '1';
      RoomService.prototype.getRoomById.mockResolvedValue(null);

      await roomController.getRoomById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Room not found' });
    });

    it('should return 400 for invalid room id format', async () => {
      mockRequest.params.id = 'invalid';

      await roomController.getRoomById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid room ID format' });
    });

    it('should handle errors when getting a room by id', async () => {
      mockRequest.params.id = '1';
      const error = new Error('Database error');
      RoomService.prototype.getRoomById.mockRejectedValue(error);

      await roomController.getRoomById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('createRoom', () => {
    it('should create a room successfully', async () => {
      const mockRoom = { id: 1, name: 'New Room', capacity: 4 };
      mockRequest.body = { name: 'New Room', capacity: 4 };
      RoomService.prototype.createRoom.mockResolvedValue(mockRoom);

      await roomController.createRoom(mockRequest, mockResponse);

      expect(RoomService.prototype.createRoom).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockRoom);
    });

    it('should return 400 when name is missing', async () => {
      mockRequest.body = { capacity: 4 };

      await roomController.createRoom(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Name is required' });
    });

    it('should return 400 when capacity is invalid', async () => {
      mockRequest.body = { name: 'New Room', capacity: 'invalid' };

      await roomController.createRoom(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Capacity must be a positive number' });
    });

    it('should handle validation errors', async () => {
      mockRequest.body = { name: 'New Room', capacity: 4 };
      const error = new Error('Validation error');
      RoomService.prototype.createRoom.mockRejectedValue(error);

      await roomController.createRoom(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Validation error' });
    });

    it('should handle other errors when creating a room', async () => {
      mockRequest.body = { name: 'New Room', capacity: 4 };
      const error = new Error('Database error');
      RoomService.prototype.createRoom.mockRejectedValue(error);

      await roomController.createRoom(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('updateRoom', () => {
    it('should update a room successfully', async () => {
      const mockRoom = { id: 1, name: 'Updated Room', capacity: 5 };
      mockRequest.params.id = '1';
      mockRequest.body = { name: 'Updated Room', capacity: 5 };
      RoomService.prototype.updateRoom.mockResolvedValue(mockRoom);

      await roomController.updateRoom(mockRequest, mockResponse);

      expect(RoomService.prototype.updateRoom).toHaveBeenCalledWith('1', mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockRoom);
    });

    it('should return 400 for invalid room id format', async () => {
      mockRequest.params.id = 'invalid';
      mockRequest.body = { name: 'Updated Room' };

      await roomController.updateRoom(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid room ID format' });
    });

    it('should return 400 when no update data is provided', async () => {
      mockRequest.params.id = '1';
      mockRequest.body = {};

      await roomController.updateRoom(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'No update data provided' });
    });

    it('should return 404 when room is not found', async () => {
      mockRequest.params.id = '1';
      mockRequest.body = { name: 'Updated Room' };
      RoomService.prototype.updateRoom.mockResolvedValue(null);

      await roomController.updateRoom(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Room not found' });
    });

    it('should handle validation errors', async () => {
      mockRequest.params.id = '1';
      mockRequest.body = { name: 'Updated Room' };
      const error = new Error('Validation error');
      RoomService.prototype.updateRoom.mockRejectedValue(error);

      await roomController.updateRoom(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Validation error' });
    });

    it('should handle other errors when updating a room', async () => {
      mockRequest.params.id = '1';
      mockRequest.body = { name: 'Updated Room' };
      const error = new Error('Database error');
      RoomService.prototype.updateRoom.mockRejectedValue(error);

      await roomController.updateRoom(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('deleteRoom', () => {
    it('should delete a room successfully', async () => {
      mockRequest.params.id = '1';
      RoomService.prototype.deleteRoom.mockResolvedValue(true);

      await roomController.deleteRoom(mockRequest, mockResponse);

      expect(RoomService.prototype.deleteRoom).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });

    it('should return 400 for invalid room id format', async () => {
      mockRequest.params.id = 'invalid';

      await roomController.deleteRoom(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid room ID format' });
    });

    it('should return 404 when room is not found', async () => {
      mockRequest.params.id = '1';
      RoomService.prototype.deleteRoom.mockResolvedValue(false);

      await roomController.deleteRoom(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Room not found' });
    });

    it('should handle errors when deleting a room', async () => {
      mockRequest.params.id = '1';
      const error = new Error('Database error');
      RoomService.prototype.deleteRoom.mockRejectedValue(error);

      await roomController.deleteRoom(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
});
