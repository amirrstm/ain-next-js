import { IconX } from '@tabler/icons-react'
import React from 'react'
import { useFieldArray } from 'react-hook-form'

import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface Props {
  name: string
  control: any
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
    <ul className="space-y-6 list-disc my-4 ms-4">
      {fields.map((field, index) => (
        <li key={field.id}>
          <FormField
            control={control}
            name={`${name}.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input {...field} inputSize="sm" placeholder={placeholder} onKeyDown={e => onKeyDown(e, index)} />

                    {fields.length > 1 && (
                      <IconX
                        onClick={() => remove(index)}
                        className="absolute end-2 top-1/2 -translate-y-1/2 w-4 h-4 hover:text-red-500 cursor-pointer z-[2]"
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
