import { PrismaClient } from '@prisma/client';
import { env } from 'process';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const db = prisma;
