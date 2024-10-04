const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.bookRoom = async (req, res) => {
  const { roomId, userId, date } = req.body;

  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    if (!room.isAvailable) {
      return res.status(400).json({ error: 'Room not available' });
    }
    const booking = await prisma.booking.create({
      data: { roomId, userId, date: new Date(date) },
    });

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getRoom = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany();
    res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};