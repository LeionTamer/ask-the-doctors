import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './drizzle/schemas',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
