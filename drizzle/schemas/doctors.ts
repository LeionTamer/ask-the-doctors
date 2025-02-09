import {
  pgTable,
  uniqueIndex,
  varchar,
  integer,
  primaryKey,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const doctors = pgTable(
  'doctors',
  {
    id: integer().generatedAlwaysAsIdentity(),
    name: varchar('name', { length: 50 }).notNull(),
    email: varchar('email', { length: 100 }).notNull().unique(), // Ensure email is unique
    writing_tone: varchar('writing_tone', { length: 255 })
      .notNull()
      .default(''),
    summary: varchar('summary', { length: 255 }).notNull().default(''),
  },
  (table) => {
    return [
      {
        emailIndex: uniqueIndex('email_idx').on(table.email), // Unique index on email
        pk: primaryKey({ columns: [table.id, table.email] }),
      },
    ]
  }
)

export const doctorsSelectSchema = createSelectSchema(doctors)
export type DoctorsSelectType = z.infer<typeof doctorsSelectSchema>

export const doctorsInsertSchema = createInsertSchema(doctors, {
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(5, { message: 'Name must be at least 10 characters long' })
    .max(50, { message: 'Name must be at most 50 characters long' }),
  email: z.coerce
    .string()
    .email()
    .min(5, { message: 'Email must be at least 10 characters long' }),
  writing_tone: z
    .string()
    .max(255, { message: 'Writing Tone is limited to 255 characters long' })
    .optional(),
  summary: z
    .string()
    .max(255, { message: 'Writing Tone is limited to 255 characters long' })
    .optional(),
})
export type DoctorsInsertType = z.infer<typeof doctorsInsertSchema>
