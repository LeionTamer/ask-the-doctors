import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export type ActionResponseType<T> = {
  data?: T
  success?: boolean
  errorMessage?: string
  errors?: Partial<Record<keyof T, string[]>>
}

interface IFormInputFieldProps extends Partial<HTMLInputElement> {
  label: string
  errors?: string[]
}

export type PgErrorType = {
  code?: string
  message?: string
}

export function FormInputField({
  label,
  errors,
  ...props
}: IFormInputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={props.name}>{label}</Label>
      <Input defaultValue={props.defaultValue} name={props.name} />
      <div className="">
        {errors && (
          <>
            {errors.map((error, idx) => (
              <div key={idx} style={{ color: 'red' }}>
                {error}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export function FormTextAreaField({
  label,
  errors,
  ...props
}: IFormInputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={props.name}>{label}</Label>
      <Textarea defaultValue={props.defaultValue} name={props.name} />
      <div className="">
        {errors && (
          <>
            {errors.map((error, idx) => (
              <div key={idx} style={{ color: 'red' }}>
                {error}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
