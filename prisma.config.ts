import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

// Same precedence as Next.js: .env.local overrides .env
loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

/**
 * Two-URL pattern for Supabase + Prisma 7:
 *
 * - DATABASE_URL          → Transaction pooler (port 6543) for app runtime.
 *                           Per-transaction pooling, scales for serverless,
 *                           BUT no prepared statements / DDL / advisory locks.
 *
 * - MIGRATE_DATABASE_URL  → Session pooler (port 5432) for migrate / studio /
 *                           seed. Full Postgres feature set.
 *
 * If MIGRATE_DATABASE_URL is unset (e.g. local Docker dev with one URL), fall
 * back to DATABASE_URL so single-URL setups still work.
 */
const migrateUrl = process.env.MIGRATE_DATABASE_URL ?? process.env.DATABASE_URL ?? "";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: migrateUrl,
  },
});
