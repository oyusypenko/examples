import { PrismaClient } from '../generated/prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['query'],
})

// Prevent multiple instances in development
declare global {
  var cachedPrisma: PrismaClient;
}

const dbClient = global.cachedPrisma || prisma;

if (process.env.NODE_ENV === 'development') {
  global.cachedPrisma = dbClient;
}

export default dbClient;