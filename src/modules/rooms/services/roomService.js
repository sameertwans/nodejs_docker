const RoomRepository = require('../repositories/roomRepository');

class RoomService {
  constructor() {
    this.roomRepository = new RoomRepository();
  }

  async getAllRooms(filters = {}) {
    try {
      return await this.roomRepository.getAllRooms(filters);
    } catch (error) {
      console.error('Error in getAllRooms service:', error);
      throw error;
    }
  }

  async getRoomById(id) {
    try {
      return await this.roomRepository.getRoomById(id);
    } catch (error) {
      console.error(`Error in getRoomById service for id ${id}:`, error);
      throw error;
    }
  }

  async createRoom(roomData) {
    try {
      return await this.roomRepository.createRoom(roomData);
    } catch (error) {
      console.error('Error in createRoom service:', error);
      throw error;
    }
  }

  async updateRoom(id, roomData) {
    try {
      const updatedRoom = await this.roomRepository.updateRoom(id, roomData);
      if (!updatedRoom) {
        throw new Error('Room not found');
      }
      return updatedRoom;
    } catch (error) {
      console.error(`Error in updateRoom service for id ${id}:`, error);
      throw error;
    }
  }

  async deleteRoom(id) {
    try {
      const deleted = await this.roomRepository.deleteRoom(id);
      if (!deleted) {
        throw new Error('Room not found');
      }
      return true;
    } catch (error) {
      console.error(`Error in deleteRoom service for id ${id}:`, error);
      throw error;
    }
  }
}

module.exports = RoomService;