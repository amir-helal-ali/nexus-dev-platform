// ============================================================
// Script: إنشاء حساب أدمن تجريبي
// Run: bun run scripts/seed-admin.ts
// ============================================================

import bcrypt from "bcryptjs";
import { db } from "../src/lib/db";

async function main() {
  console.log("🚀 Seeding admin user...");

  const adminEmail = "admin@nexusdev.eg";
  const adminPassword = "Admin@2026";

  // Check if exists
  const existing = await db.user.findUnique({
    where: { email: adminEmail },
  });

  if (existing) {
    console.log("✅ Admin user already exists");
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await db.user.create({
    data: {
      name: "Admin NEXUS",
      email: adminEmail,
      phone: "+20 100 123 4567",
      passwordHash,
      role: "admin",
    },
  });

  console.log("✅ Admin user created:");
  console.log("   Email:", admin.email);
  console.log("   Password:", adminPassword);
  console.log("   Role:", admin.role);
  console.log("   ID:", admin.id);
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
