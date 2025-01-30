import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export type ActionResponseType<T> = {
  success?: boolean
  data?: T
  errorMessage?: string
  errors?: Partial<Record<keyof T, string[]>>
}

type FormInputFieldPropsType = {
  label: string
  errors?: string[]
} & Partial<HTMLInputElement>

export function FormInputField({
  label,
  errors,
  ...props
}: FormInputFieldPropsType) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={props.name}>{label}</Label>
      <Input name={props.name} defaultValue={props.defaultValue} />
      {errors && (
        <div>
          {errors.map((error, eId) => (
            <div key={`${eId}-${error}`} style={{ color: 'red' }}>
              {error}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
