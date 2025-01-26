import { db } from '@/lib/db'

export default async function DoctorsPage() {
  const test = await db.execute('SELECT 1')
  console.table(test.rows)
  return (
    <div>
      <h1>Doctors</h1>
    </div>
  )
}
