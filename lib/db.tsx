import { drizzle as pgDrizzle } from 'drizzle-orm/node-postgres'
// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';

// const sql = neon(process.env.DATABASE_URL!);
// const db = drizzle({ client: sql });

export const db = pgDrizzle(process.env.DATABASE_URL!)
