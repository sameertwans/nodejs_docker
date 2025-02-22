const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

  // await prisma.room.createMany({
  //   data: [
  //     { roomNumber: 101, isAvailable: true, price: 100.0 },
  //     { roomNumber: 102, isAvailable: true, price: 150.0 },
  //     { roomNumber: 103, isAvailable: true, price: 200.0 },
  //     { roomNumber: 104, isAvailable: true, price: 250.0 },
  //     { roomNumber: 105, isAvailable: true, price: 300.0 },
  //   ],
  // });

  const rooms = [
    { roomNumber: 101, isAvailable: true, price: 100.0 },
    { roomNumber: 102, isAvailable: true, price: 150.0 },
    { roomNumber: 103, isAvailable: true, price: 200.0 },
    { roomNumber: 104, isAvailable: true, price: 250.0 },
    { roomNumber: 105, isAvailable: true, price: 300.0 },
  ];

  for (const room of rooms) {
    const existingRoom = await prisma.room.findUnique({
      where: { roomNumber: room.roomNumber }
    });

    if (!existingRoom) {
      await prisma.room.create({
        data: room
      });
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });