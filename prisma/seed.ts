import { PrismaClient } from '@prisma/client';

import faker from "faker";

const prisma = new PrismaClient();

const role = ["admin", "user"];

async function seed() {
  try {
    // Seed Users
    const users = await prisma.user.createMany({
      data: Array.from({ length: 5 }, () => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        displayName: faker.name.findName(),
        description: faker.lorem.sentence(),
      })),
    });

    // Seed Podcasts
    const podcasts = await prisma.podcast.createMany({
      data: Array.from({ length: 10 }, () => ({
        podcaster: faker.random.arrayElement(users).username,
        title: faker.lorem.words(3),
        audio: 'none',
        picture: 'none',
      })),
    });

    // Seed Reviews
    await prisma.review.createMany({
      data: Array.from({ length: 20 }, () => ({
        podcaster: faker.random.arrayElement(users).username,
        idPodcast: faker.random.arrayElement(podcasts).id,
        reviewer: faker.internet.userName(),
        review: faker.lorem.paragraph(),
        rating: faker.random.number({ min: 1, max: 5 }),
      })),
    });

    console.log('Seeding successful');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();
