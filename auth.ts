import NextAuth from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from './lib/db'
import { users } from './drizzle/schemas/users'
import { accounts } from './drizzle/schemas/accounts'
import { sessions, verificationTokens } from './drizzle/schemas/sessions'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [],
})
