'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog'
import { useState } from 'react'
import TestForm, { AddDoctorForm } from './form'

export default function AddDoctor() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add Doctor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Doctor</DialogTitle>
          <DialogDescription>
            Create a new entry for the doctors table
          </DialogDescription>
        </DialogHeader>
        <TestForm />
        <AddDoctorForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
