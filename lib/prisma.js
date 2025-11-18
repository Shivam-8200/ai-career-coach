/* lib/prisma.js */
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const db =
  globalForPrisma.__prismaClient__ ||
  (globalForPrisma.__prismaClient__ = new PrismaClient());

export default db;
