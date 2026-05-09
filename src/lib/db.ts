import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

function makeClient(): PrismaClient {
  // pg accepts an empty/placeholder string here; real connection only happens
  // when a query is dispatched. This lets `next build` import this module
  // without DATABASE_URL set (build-time data collection skips runtime queries).
  const url = process.env.DATABASE_URL ?? "";
  const adapter = new PrismaPg({ connectionString: url });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const db = globalThis.prismaGlobal ?? makeClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = db;
}
