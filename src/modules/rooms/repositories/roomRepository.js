const { PrismaClient } = require('@prisma/client');

class RoomRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async findRoomById(roomId) {
    return this.prisma.room.findUnique({
      where: { id: roomId },
    });
  }

  async createBooking(roomId, userId, date) {
    return this.prisma.booking.create({
      data: { roomId, userId, date: new Date(date) },
    });
  }

  async findAllRooms() {
    return this.prisma.room.findMany();
  }
}

module.exports = RoomRepository;