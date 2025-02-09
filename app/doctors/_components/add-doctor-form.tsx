'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useActionState, useEffect, useState } from 'react'
import { addDoctorAction } from '../actions'
import { FormInputField, FormTextAreaField } from '@/helpers/formHelpers'

export default function AddDoctorForm() {
  const [open, setOpen] = useState(false)
  const [formState, formAction, isPending] = useActionState(addDoctorAction, {
    data: { name: '', email: '', writing_tone: '' },
  })

  useEffect(() => {
    if (formState.success === true) {
      setOpen(false)
    }
  }, [formState.success])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add Doctor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Doctor</DialogTitle>
          <DialogDescription>Add a new doctor to the list</DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  )
}
