const RoomService = require('../services/roomService');

class RoomController {
  constructor() {
    this.roomService = new RoomService();
  }

  async getAllRooms(req, res) {
    try {
      const rooms = await this.roomService.getAllRooms(req.query);
      res.status(200).json(rooms);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getRoomById(req, res) {
    const { id } = req.params;
    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ error: 'Invalid room ID format' });
    }
    try {
      const room = await this.roomService.getRoomById(id);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
      res.status(200).json(room);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createRoom(req, res) {
    const { name, capacity } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!Number.isInteger(Number(capacity)) || Number(capacity) <= 0) {
      return res.status(400).json({ error: 'Capacity must be a positive number' });
    }
    try {
      const newRoom = await this.roomService.createRoom(req.body);
      res.status(201).json(newRoom);
    } catch (error) {
      if (error.message === 'Validation error') {
        return res.status(400).json({ error: error.message });
      }
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateRoom(req, res) {
    const { id } = req.params;
    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ error: 'Invalid room ID format' });
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'No update data provided' });
    }
    try {
      const updatedRoom = await this.roomService.updateRoom(id, req.body);
      if (!updatedRoom) {
        return res.status(404).json({ error: 'Room not found' });
      }
      res.status(200).json(updatedRoom);
    } catch (error) {
      if (error.message === 'Validation error') {
        return res.status(400).json({ error: error.message });
      }
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteRoom(req, res) {
    const { id } = req.params;
    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ error: 'Invalid room ID format' });
    }
    try {
      const deleted = await this.roomService.deleteRoom(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Room not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new RoomController();