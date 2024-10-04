const RoomService = require('../services/roomService');

class RoomController {
  constructor() {
    this.roomService = new RoomService();
  }

  async bookRoom(req, res) {
    const { roomId, userId, date } = req.body;

    try {
      const booking = await this.roomService.bookRoom(roomId, userId, date);
      res.status(200).json(booking);
    } catch (error) {
      if (error.message === 'Room not found') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Room not available') {
        return res.status(400).json({ error: error.message });
      }
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getRooms(req, res) {
    try {
      const rooms = await this.roomService.getRooms();
      res.status(200).json(rooms);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new RoomController();