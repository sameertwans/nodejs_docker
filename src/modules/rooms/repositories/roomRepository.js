const { PrismaClient } = require('@prisma/client');

class RoomRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllRooms(filters = {}) {
    try {
      const where = {};
      if (filters.capacity) {
        where.capacity = parseInt(filters.capacity, 10);
      }
      return await this.prisma.room.findMany({ where });
    } catch (error) {
      // console.error('Error in getAllRooms repository:', error);
      throw error;
    }
  }

  async getRoomById(id) {
    try {
      return await this.prisma.room.findUnique({
        where: { id: parseInt(id, 10) },
      });
    } catch (error) {
      // console.error(`Error in getRoomById repository for id ${id}:`, error);
      throw error;
    }
  }

  async createRoom(roomData) {
    try {
      return await this.prisma.room.create({
        data: roomData,
      });
    } catch (error) {
      // console.error('Error in createRoom repository:', error);
      throw error;
    }
  }

  async updateRoom(id, roomData) {
    try {
      return await this.prisma.room.update({
        where: { id: parseInt(id, 10) },
        data: roomData,
      });
    } catch (error) {
      // console.error(`Error in updateRoom repository for id ${id}:`, error);
      throw error;
    }
  }

  async deleteRoom(id) {
    try {
      await this.prisma.room.delete({
        where: { id: parseInt(id, 10) },
      });
      return true;
    } catch (error) {
      // console.error(`Error in deleteRoom repository for id ${id}:`, error);
      throw error;
    }
  }
}

module.exports = RoomRepository;