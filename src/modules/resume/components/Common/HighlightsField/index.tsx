import { IconX } from '@tabler/icons-react'
import { type Control, type FieldValues, useFieldArray } from 'react-hook-form'

import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type React from 'react'

interface Props {
  name: string
  control: Control<FieldValues>
  placeholder?: string
}

const HighlightField: React.FC<Props> = ({ name, control, placeholder }) => {
  const { insert, remove, fields } = useFieldArray({ control, name })

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      insert(index + 1, { value: '' })
    }
  }

  return (
    <ul className="my-4 ms-4 list-disc space-y-6">
      {fields.map((field, index) => (
        <li key={field.id}>
          <FormField
            control={control}
            name={`${name}.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      className="pe-8"
                      inputSize="sm"
                      onKeyDown={(e) => onKeyDown(e, index)}
                      placeholder={placeholder}
                    />

                    {fields.length > 1 && (
                      <IconX
                        className="-translate-y-1/2 absolute end-2 top-1/2 z-[2] h-4 w-4 cursor-pointer hover:text-red-500"
                        onClick={() => remove(index)}
                      />
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </li>
      ))}
    </ul>
  )
}

export default HighlightField
