// import ChatWindow from '@/components/chat-window'
import { doctors } from '@/drizzle/schemas/doctors'
import { db } from '@/lib/db'

export default async function DoctorsPage() {
  const doctorsTable = await db.select().from(doctors)
  console.table(doctorsTable)
  return (
    <div className="min-h-[calc(100vh-3rem)]">
      <h1>Doctors</h1>
      <div>
        {/* <ChatWindow /> */}
        {doctorsTable.map((doctor) => (
          <div key={doctor.id}>{doctor.name}</div>
        ))}
      </div>
    </div>
  )
}
