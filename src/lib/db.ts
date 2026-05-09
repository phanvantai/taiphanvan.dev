import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

/**
 * Prisma client for app runtime.
 *
 * Uses DATABASE_URL — point this at Supabase Transaction pooler (port 6543)
 * in production. The pg driver adapter automatically avoids prepared
 * statements which the transaction pooler rejects.
 *
 * Build-time: process.env.DATABASE_URL may be empty during `next build` page
 * data collection. We don't throw here — pg only opens a real socket on
 * first query, so any actual call at request time will surface a clear
 * connection error instead of a misleading import-time crash.
 */
function makeClient(): PrismaClient {
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
