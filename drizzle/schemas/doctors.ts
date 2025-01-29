import { integer, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const doctors = pgTable(
  'doctors',
  {
    id: integer().primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    email: varchar('email', { length: 100 }).notNull(),
    writing_tone: varchar('writing_tone', { length: 255 })
      .notNull()
      .default(''),
  },
  (table) => {
    return [
      {
        emailIndex: uniqueIndex('email_idx').on(table.email),
      },
    ]
  }
)

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
})

export const doctorsInsertSchemaWithoutId = doctorsInsertSchema.omit({
  id: true,
})

export type DoctorsInsertType = z.infer<typeof doctorsInsertSchemaWithoutId>
