import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ProjectStatus } from "@prisma/client";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: url }),
});

const projects = [
  {
    name: "Examino",
    emoji: "📝",
    color: "#6366F1",
    status: ProjectStatus.ACTIVE,
    description:
      "B2B SaaS English exam platform cho trung tâm tiếng Anh ở VN, focus Cambridge YLE.",
  },
  {
    name: "PES Arena",
    emoji: "⚽",
    color: "#22C55E",
    status: ProjectStatus.ACTIVE,
    description: "Side project liên quan tới game/cộng đồng PES.",
  },
  {
    name: "QuickSpend",
    emoji: "💸",
    color: "#F59E0B",
    status: ProjectStatus.ACTIVE,
    description: "Mini app theo dõi chi tiêu nhanh.",
  },
  {
    name: "Littlemark",
    emoji: "🔖",
    color: "#EC4899",
    status: ProjectStatus.ACTIVE,
    description: "Bookmark/note tool cá nhân.",
  },
];

async function main() {
  for (const p of projects) {
    const existing = await prisma.sideProject.findFirst({ where: { name: p.name } });
    if (existing) {
      console.log(`↺ ${p.name} đã tồn tại, skip`);
      continue;
    }
    await prisma.sideProject.create({ data: p });
    console.log(`✓ ${p.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
