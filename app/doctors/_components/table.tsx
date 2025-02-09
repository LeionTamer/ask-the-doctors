'use client'

import BasicTable from '@/components/data-tables/basic-table'
import { DoctorsSelectType } from '@/drizzle/schemas/doctors'
import { ColumnDef } from '@tanstack/react-table'
import EditDoctorForm from './edit-doctor-form'

interface IDoctorTableProps {
  data: DoctorsSelectType[]
}

const columns: ColumnDef<DoctorsSelectType>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'writing_tone', header: 'Writing Tone' },
  {
    accessorKey: 'actions',
    cell: ({ row }) => {
      const data = row.original
      return <EditDoctorForm doctor={data} />
    },
  },
]

export function DoctorsTable({ data }: IDoctorTableProps) {
  return <BasicTable columns={columns} data={data} />
}
