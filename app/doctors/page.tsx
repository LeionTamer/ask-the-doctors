import { doctors } from '@/drizzle/schemas/doctors'
import { db } from '@/lib/db'
import { DoctorsTable } from './_components/table'
import AddDoctorForm from './_components/add-doctor-form'

export default async function DoctorsPage() {
  const doctorsTable = await db.select().from(doctors)
  console.table(doctorsTable)
  return (
    <div className="min-h-[calc(100vh-3rem)]">
      <h1>Doctors</h1>
      <div className="flex justify-end">
        <AddDoctorForm />
      </div>
      <div>
        <DoctorsTable data={doctorsTable} />
      </div>
    </div>
  )
}
