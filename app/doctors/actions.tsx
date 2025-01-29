'use server'

import {
  doctorsInsertSchemaWithoutId,
  DoctorsInsertType,
} from '@/drizzle/schemas/doctors'
import { ActionResponseType } from '@/helpers/formHelpers'
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
    const result = doctorsInsertSchemaWithoutId.safeParse(
      Object.fromEntries(formData.entries())
    )

    if (!result.success) {
      return {
        success: false,
        data: { ...prevState.data, ...data },
        errors: result.error.flatten().fieldErrors,
      }
    }

    // redirect('/doctors')
    revalidatePath('/doctors')

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
