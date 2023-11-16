const { PrismaClient } = require('@prisma/client');
// import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function deleteAllData() {
  try {
    // Delete all reviews
    await prisma.review.deleteMany({});

    // Delete all podcasts
    await prisma.podcast.deleteMany({});

    // Delete all users
    await prisma.user.deleteMany();

    console.log('Deleted all existing data successfully');

  } catch (error) {
    console.error('Error deleting data:', error);

  } finally {
    await prisma.$disconnect(); // Disconnect from the database
  }
}

async function seed() {
  await deleteAllData();
  try {
    // Seed users
    const user1 = await prisma.user.create({
      data: {
        username: 'febryan',
        email: 'user1@example.com',
        password: 'febryan',
        displayName: 'Febryan Arota',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        username: 'admin',
        email: 'admin@gmail.com',
        password: 'admin',
        displayName: 'admin',
        role: 'admin'
      },
    });


    // make datausers for 5 user with faker
    // const datausers = Array.from({ length: 5 }, () => ({
    //   username: faker.internet.userName(),
    //   email: faker.internet.email(),
    //   password: faker.internet.password(),
    //   displayName: faker.person.fullName(),
    // }));

    // const users = await prisma.user.createMany({
    //   data: datausers
    // })


    // Seed podcasts
    const podcast1 = await prisma.podcast.create({
      data: {
        // user: { connect: { username: user1.username } },
        podcaster: 'febryan',
        title: 'Podcast 1',
        audio: 'dummy.mp3',
        picture: 'dummyProfile.jpg',
      },
    });
    

    const podcast2 = await prisma.podcast.create({
      data: {
        // user: { connect: { username: user2.username } },
        podcaster: 'febryan',
        title: 'Podcast 2',
        audio: 'dummy.mp3',
        picture: 'dummyProfile.jpg',
      },
    });

  //   podcaster     String    
  // idPodcast     Int
  // reviewer      String
  // review        String
    await prisma.review.createMany({
      data: [
        {
          podcaster: user1.username, // Use podcaster instead of user
          idPodcast: podcast1.id,
          reviewer: 'Reviewer1',
          review: 'Great podcast!',
          rating: 5,
        },
        {
          podcaster: user1.username, // Use podcaster instead of user
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
    await prisma.$disconnect(); // Disconnect from the database
  }
}

// Call the seed function to populate the database
seed();
