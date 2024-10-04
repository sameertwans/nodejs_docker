const RoomService = require('../services/roomService');
const RoomRepository = require('../repositories/roomRepository');

// Mock the RoomRepository
jest.mock('../repositories/roomRepository');

describe('RoomService', () => {
  let roomService;
  let mockRoomRepository;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Create a new instance of RoomService for each test
    roomService = new RoomService();
    
    // Get the mocked RoomRepository instance
    mockRoomRepository = RoomRepository.mock.instances[0];
  });

  describe('getAllRooms', () => {
    it('should return all rooms when no filters are provided', async () => {
      const mockRooms = [{ id: 1, name: 'Room 1' }, { id: 2, name: 'Room 2' }];
      mockRoomRepository.getAllRooms.mockResolvedValue(mockRooms);

      const result = await roomService.getAllRooms();

      expect(result).toEqual(mockRooms);
      expect(mockRoomRepository.getAllRooms).toHaveBeenCalledWith({});
    });

    it('should return filtered rooms when filters are provided', async () => {
      const filters = { type: 'suite' };
      const mockFilteredRooms = [{ id: 1, name: 'Suite 1', type: 'suite' }];
      mockRoomRepository.getAllRooms.mockResolvedValue(mockFilteredRooms);

      const result = await roomService.getAllRooms(filters);

      expect(result).toEqual(mockFilteredRooms);
      expect(mockRoomRepository.getAllRooms).toHaveBeenCalledWith(filters);
    });

    it('should throw an error when repository throws an error', async () => {
      const error = new Error('Database error');
      mockRoomRepository.getAllRooms.mockRejectedValue(error);

      await expect(roomService.getAllRooms()).rejects.toThrow('Database error');
      expect(mockRoomRepository.getAllRooms).toHaveBeenCalled();
    });
  });

  describe('getRoomById', () => {
    it('should return a room when a valid id is provided', async () => {
      const mockRoom = { id: 1, name: 'Room 1' };
      mockRoomRepository.getRoomById.mockResolvedValue(mockRoom);

      const result = await roomService.getRoomById(1);

      expect(result).toEqual(mockRoom);
      expect(mockRoomRepository.getRoomById).toHaveBeenCalledWith(1);
    });

    it('should throw an error when repository throws an error', async () => {
      const error = new Error('Room not found');
      mockRoomRepository.getRoomById.mockRejectedValue(error);

      await expect(roomService.getRoomById(999)).rejects.toThrow('Room not found');
      expect(mockRoomRepository.getRoomById).toHaveBeenCalledWith(999);
    });
  });

  describe('createRoom', () => {
    it('should create and return a new room', async () => {
      const newRoomData = { name: 'New Room', type: 'standard' };
      const createdRoom = { id: 1, ...newRoomData };
      mockRoomRepository.createRoom.mockResolvedValue(createdRoom);

      const result = await roomService.createRoom(newRoomData);

      expect(result).toEqual(createdRoom);
      expect(mockRoomRepository.createRoom).toHaveBeenCalledWith(newRoomData);
    });

    it('should throw an error when repository throws an error', async () => {
      const newRoomData = { name: 'Invalid Room' };
      const error = new Error('Invalid room data');
      mockRoomRepository.createRoom.mockRejectedValue(error);

      await expect(roomService.createRoom(newRoomData)).rejects.toThrow('Invalid room data');
      expect(mockRoomRepository.createRoom).toHaveBeenCalledWith(newRoomData);
    });
  });

  describe('updateRoom', () => {
    it('should update and return the updated room', async () => {
      const roomId = 1;
      const updateData = { name: 'Updated Room' };
      const updatedRoom = { id: roomId, ...updateData };
      mockRoomRepository.updateRoom.mockResolvedValue(updatedRoom);

      const result = await roomService.updateRoom(roomId, updateData);

      expect(result).toEqual(updatedRoom);
      expect(mockRoomRepository.updateRoom).toHaveBeenCalledWith(roomId, updateData);
    });

    it('should throw an error when room is not found', async () => {
      const roomId = 999;
      const updateData = { name: 'Non-existent Room' };
      mockRoomRepository.updateRoom.mockResolvedValue(null);

      await expect(roomService.updateRoom(roomId, updateData)).rejects.toThrow('Room not found');
      expect(mockRoomRepository.updateRoom).toHaveBeenCalledWith(roomId, updateData);
    });

    it('should throw an error when repository throws an error', async () => {
      const roomId = 1;
      const updateData = { name: 'Error Room' };
      const error = new Error('Database error');
      mockRoomRepository.updateRoom.mockRejectedValue(error);

      await expect(roomService.updateRoom(roomId, updateData)).rejects.toThrow('Database error');
      expect(mockRoomRepository.updateRoom).toHaveBeenCalledWith(roomId, updateData);
    });
  });

  describe('deleteRoom', () => {
    it('should delete a room and return true', async () => {
      const roomId = 1;
      mockRoomRepository.deleteRoom.mockResolvedValue(true);

      const result = await roomService.deleteRoom(roomId);

      expect(result).toBe(true);
      expect(mockRoomRepository.deleteRoom).toHaveBeenCalledWith(roomId);
    });

    it('should throw an error when room is not found', async () => {
      const roomId = 999;
      mockRoomRepository.deleteRoom.mockResolvedValue(false);

      await expect(roomService.deleteRoom(roomId)).rejects.toThrow('Room not found');
      expect(mockRoomRepository.deleteRoom).toHaveBeenCalledWith(roomId);
    });

    it('should throw an error when repository throws an error', async () => {
      const roomId = 1;
      const error = new Error('Database error');
      mockRoomRepository.deleteRoom.mockRejectedValue(error);

      await expect(roomService.deleteRoom(roomId)).rejects.toThrow('Database error');
      expect(mockRoomRepository.deleteRoom).toHaveBeenCalledWith(roomId);
    });
  });
});