import { drizzle as pgDrizzle } from 'drizzle-orm/node-postgres'

export const db = pgDrizzle(process.env.DATABASE_URL!)
