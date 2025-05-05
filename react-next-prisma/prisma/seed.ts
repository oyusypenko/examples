import prisma from '../prisma/prisma'

async function main() {
  try {
    await prisma.number.deleteMany();
    await prisma.grade.deleteMany();

    await prisma.number.createMany({
      data: [
        { value: 3 },
        { value: 5 },
        { value: 7 },
        { value: 2 },
        { value: -15 },
        { value: 44 }
      ]
    });

    await prisma.grade.createMany({
      data: [
        { class: 'Math', grade: 85 },
        { class: 'Science', grade: 92 },
        { class: 'History', grade: 78 },
        { class: 'Math', grade: 65 },
        { class: 'Science', grade: 45 },
        { class: 'History', grade: 90 }
      ]
    });

    console.log('Database has been seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();