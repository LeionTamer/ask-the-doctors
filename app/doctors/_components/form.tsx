'use client'

import { Dispatch, useActionState, useEffect } from 'react'
import { addDoctorAction, editDoctorAction } from '../actions'
import { FormInputField, FormTextAreaField } from '@/helpers/formHelpers'
import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { DoctorsSelectType } from '@/drizzle/schemas/doctors'

export function AddDoctorForm({ setOpen }: { setOpen: Dispatch<boolean> }) {
  const [formState, formAction, isPending] = useActionState(addDoctorAction, {
    data: { name: '', email: '', writing_tone: '' },
  })

  useEffect(() => {
    if (formState.success === true) {
      setOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.success])

  return (
    <form action={formAction} className="flex flex-col gap-4">
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
  )
}

export function EditDoctorForm({
  setOpen,
  data,
}: {
  setOpen: Dispatch<boolean>
  data: DoctorsSelectType
}) {
  const [formState, formAction, isPending] = useActionState(editDoctorAction, {
    data,
  })

  useEffect(() => {
    if (formState.success === true) {
      setOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.success])

  return (
    <form action={formAction} className="flex flex-col gap-4">
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
  )
}
