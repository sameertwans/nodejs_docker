const RoomRepository = require('../repositories/roomRepository');

class RoomService {
  constructor() {
    this.roomRepository = new RoomRepository();
  }

  async bookRoom(roomId, userId, date) {
    const room = await this.roomRepository.findRoomById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }
    if (!room.isAvailable) {
      throw new Error('Room not available');
    }
    return this.roomRepository.createBooking(roomId, userId, date);
  }

  async getRooms() {
    return this.roomRepository.findAllRooms();
  }
}

module.exports = RoomService;