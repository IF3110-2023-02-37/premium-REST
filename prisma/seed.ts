const { PrismaClient } = require('@prisma/client');
// import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function deleteAllData() {
  try {
    await prisma.review.deleteMany({});
    await prisma.podcast.deleteMany({});
    await prisma.user.deleteMany();

    console.log('Deleted all existing data successfully');

  } catch (error) {
    console.error('Error deleting data:', error);

  } finally {
    await prisma.$disconnect(); 
  }
}

async function seed() {
  await deleteAllData();
  try {
    // Seed users
    const user1 = await prisma.user.create({
      data: {
        username: 'test1234',
        email: 'user1@example.com',
        // password test1234
        password: '$2b$10$zHNX5vLLZC2iRuJPQNAs3ezU8.TMVflft1iZQL.37lDYLpg7z3YwK',
        displayName: 'Febryan Arota',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        username: 'admin1234',
        email: 'admin@gmail.com',
        // password admin1234
        password: '$2b$10$XlLvHMInEqFhWB5w4SBe3ujNuRfdVHjoki4mfWOyZ0plzbCtccvre',
        displayName: 'admin',
        role: 'admin'
      },
    });



    // Seed podcasts
    const podcast1 = await prisma.podcast.create({
      data: {
        podcaster: 'test1234',
        title: 'Podcast 1',
        audio: 'dummy.mp3',
        picture: 'dummyProfile.jpg',
      },
    });
    

    const podcast2 = await prisma.podcast.create({
      data: {
        podcaster: 'test1234',
        title: 'Podcast 2',
        audio: 'dummy.mp3',
        picture: 'dummyProfile.jpg',
      },
    });

    await prisma.review.createMany({
      data: [
        {
          podcaster: user1.username, 
          idPodcast: podcast1.id,
          reviewer: 'Reviewer1',
          review: 'Great podcast!',
          rating: 5,
        },
        {
          podcaster: user1.username, 
          idPodcast: podcast2.id,
          reviewer: 'Reviewer2',
          review: 'Awesome content!',
          rating: 4,
        },
      ],
    });

    console.log('Seeding completed successfully');

  } catch (error) {
    console.error('Error seeding data:', error);

  } finally {
    await prisma.$disconnect(); 
  }
}

seed();
