'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DoctorsSelectType } from '@/drizzle/schemas/doctors'
import { useActionState, useEffect, useState } from 'react'
import { editDoctorAction } from '../actions'
import { Button } from '@/components/ui/button'
import { Pen } from 'lucide-react'
import { FormInputField, FormTextAreaField } from '@/helpers/formHelpers'

export default function EditDoctorForm({
  doctor,
}: {
  doctor: DoctorsSelectType
}) {
  const [open, setOpen] = useState(false)
  const [formState, formAction, isPending] = useActionState(editDoctorAction, {
    data: doctor,
  })

  useEffect(() => {
    if (formState.success === true) {
      setOpen(false)
    }
  }, [formState.success])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="link" onClick={() => setOpen(true)}>
          <Pen size="sm" className="text-orange-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Doctor</DialogTitle>
          <DialogDescription>Edit an exisiting doctor detail</DialogDescription>
          <form action={formAction}>
            <FormInputField
              label="name"
              defaultValue={formState.data?.name}
              name="name"
              errors={formState.errors?.name}
            />
            <FormInputField
              label="email"
              defaultValue={formState.data?.email}
              name="email"
              errors={formState.errors?.email}
            />
            <FormTextAreaField
              label="Writing Tone"
              defaultValue={formState.data?.writing_tone}
              name="writing_tone"
              errors={formState.errors?.writing_tone}
            />
            {formState.errorMessage && (
              <div className="overfl overflow-x-auto text-red-700">
                {formState.errorMessage}
              </div>
            )}
            <DialogFooter>
              <div className="flex flex-row">
                <div className="flex flex-col justify-end">
                  <Button type="submit" disabled={isPending}>
                    Save
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
