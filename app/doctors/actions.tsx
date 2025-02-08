'use server'

import {
  doctors,
  doctorsInsertSchema,
  DoctorsInsertType,
  doctorsSelectSchema,
  DoctorsSelectType,
} from '@/drizzle/schemas/doctors'
import { ActionResponseType, PgErrorType } from '@/helpers/formHelpers'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export type AddDoctorActionStateType = {
  success?: boolean
  errors?: string[]
  fields?: DoctorsInsertType
}

export async function addDoctorAction(
  prevState: ActionResponseType<DoctorsInsertType>,
  formData: unknown
): Promise<ActionResponseType<DoctorsInsertType>> {
  if (!(formData instanceof FormData)) {
    return {
      success: false,
      errorMessage: 'Invalid form data',
    }
  }
  const data = Object.fromEntries(
    formData.entries()
  ) as unknown as DoctorsInsertType

  try {
    const result = doctorsInsertSchema.safeParse(
      Object.fromEntries(formData.entries())
    )

    if (!result.success) {
      return {
        success: false,
        data: { ...prevState.data, ...data },
        errors: result.error.flatten().fieldErrors,
      }
    }

    try {
      await db
        .insert(doctors)
        .values(data)
        .returning({ id: doctors.id, email: doctors.email })
      revalidatePath('/doctors')
    } catch (e) {
      const error = e as PgErrorType
      console.error(error)
      return {
        success: false,
        data: { ...prevState.data, ...data },
        errorMessage: `Failed to insert to doctors table with the issue: ${error?.code}`,
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
    }
  }
}

export async function editDoctorAction(
  prevState: ActionResponseType<DoctorsSelectType>,
  formData: unknown
): Promise<ActionResponseType<DoctorsSelectType>> {
  if (!(formData instanceof FormData)) {
    return {
      success: false,
      errorMessage: 'Invalid form data',
    }
  }
  const data = Object.fromEntries(
    formData.entries()
  ) as unknown as DoctorsInsertType

  try {
    const result = doctorsSelectSchema.safeParse({
      ...prevState.data,
      ...data,
    })

    if (!result.success) {
      return {
        success: false,
        data: { ...prevState.data, ...data } as DoctorsSelectType,
        errors: result.error.flatten().fieldErrors,
      }
    }

    await db.update(doctors).set(data).where(eq(doctors.id, prevState.data!.id))

    return { success: true }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      errorMessage: 'something went wrong',
    }
  }
}
