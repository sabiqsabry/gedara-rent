import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create test users
  const hashedPassword = await bcrypt.hash("password123", 12)

  const guest = await prisma.user.upsert({
    where: { email: "guest@gedarent.com" },
    update: {},
    create: {
      email: "guest@gedarent.com",
      name: "Test Guest",
      hashedPassword,
      role: "GUEST",
      emailVerified: new Date(),
    },
  })

  const host = await prisma.user.upsert({
    where: { email: "host@gedarent.com" },
    update: {},
    create: {
      email: "host@gedarent.com",
      name: "Test Host",
      hashedPassword,
      role: "HOST",
      emailVerified: new Date(),
    },
  })

  const admin = await prisma.user.upsert({
    where: { email: "admin@gedarent.com" },
    update: {},
    create: {
      email: "admin@gedarent.com",
      name: "Admin User",
      hashedPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  })

  console.log("✅ Created users:", { guest: guest.email, host: host.email, admin: admin.email })

  // Create amenities
  const amenitiesData = [
    { name: "Wifi", icon: "wifi", category: "ESSENTIALS" },
    { name: "Kitchen", icon: "kitchen", category: "ESSENTIALS" },
    { name: "Air Conditioning", icon: "ac", category: "ESSENTIALS" },
    { name: "Heating", icon: "heating", category: "ESSENTIALS" },
    { name: "TV", icon: "tv", category: "ESSENTIALS" },
    { name: "Washer", icon: "washer", category: "ESSENTIALS" },
    { name: "Pool", icon: "pool", category: "FEATURES" },
    { name: "Hot Tub", icon: "hot-tub", category: "FEATURES" },
    { name: "Free Parking", icon: "parking", category: "FEATURES" },
    { name: "Gym", icon: "gym", category: "FEATURES" },
    { name: "Workspace", icon: "workspace", category: "FEATURES" },
    { name: "Smoke Alarm", icon: "smoke-alarm", category: "SAFETY" },
    { name: "First Aid Kit", icon: "first-aid", category: "SAFETY" },
    { name: "Fire Extinguisher", icon: "fire-extinguisher", category: "SAFETY" },
    { name: "Carbon Monoxide Alarm", icon: "co-alarm", category: "SAFETY" },
  ]

  for (const amenity of amenitiesData) {
    await prisma.amenity.upsert({
      where: { name: amenity.name },
      update: {},
      create: amenity,
    })
  }

  console.log("✅ Created amenities")

  console.log("🎉 Seeding completed!")
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
