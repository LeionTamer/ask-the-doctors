// import ChatWindow from '@/components/chat-window'
import { doctors } from '@/drizzle/schemas/doctors'
import { db } from '@/lib/db'
import AddDoctor from './_components/add_doctor'

export default async function DoctorsPage() {
  const doctorsTable = await db.select().from(doctors)
  console.table(doctorsTable)
  return (
    <div className="min-h-[calc(100vh-3rem)]">
      <h1>Doctors</h1>
      <div>
        <AddDoctor />
        {doctorsTable.map((doctor) => (
          <div key={doctor.id}>{doctor.name}</div>
        ))}
      </div>
    </div>
  )
}
