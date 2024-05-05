import React from 'react'
import AsyncSelect from 'react-select/async'

import { reactSelectTheme } from '@/lib/utils'
import { getOccupations } from '@/modules/resume/service'

let controller: AbortController

type Props = { value?: string; onChange: (e: string) => void; placeholder?: string; onBlur?: () => void }

const OccupationSelect = React.forwardRef<React.ElementRef<typeof AsyncSelect>, Props>(
  ({ value, onChange, placeholder = '', ...props }, ref) => {
    const loadOptions = (inputValue: string, callback: (options: { name: string }[]) => void) => {
      if (controller) {
        controller.abort()
      }

      controller = new AbortController()
      const signal = controller.signal

      getOccupations({ search: inputValue }, signal)
        .then(data => callback(inputValue ? (data.length > 0 ? data : [{ name: inputValue }]) : data))
        .catch(() => {})
    }

    const handleChange = (selectedOption: { name: string }) => {
      onChange(selectedOption.name)
    }

    return (
      <AsyncSelect<any>
        cacheOptions
        ref={ref as any}
        className="text-xs"
        onChange={handleChange}
        theme={reactSelectTheme}
        placeholder={placeholder}
        loadOptions={loadOptions}
        classNamePrefix={'ain-select'}
        getOptionLabel={op => op.name}
        getOptionValue={op => String(op.name)}
        loadingMessage={() => 'در حال جستجو...'}
        value={value ? { name: value } : undefined}
        noOptionsMessage={() => 'عنوان مورد نظر را وارد کنید'}
        classNames={{ placeholder: () => 'line-clamp-1', container: () => 'ain-select-container' }}
      />
    )
  },
)

OccupationSelect.displayName = 'OccupationSelect'

export default OccupationSelect
