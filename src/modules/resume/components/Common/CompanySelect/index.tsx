import { useTranslations } from 'next-intl'

import React from 'react'
import AsyncSelect from 'react-select/async'

import { reactSelectTheme } from '@/lib/utils'
import { getCompanies } from '@/modules/resume/service'

let controller: AbortController

type Props = {
  value?: string
  placeholder?: string
  onBlur?: () => void
  onChange: (e: string) => void
  onSelect?: (e: string) => void
}

const CompanySelect = React.forwardRef<React.ElementRef<typeof AsyncSelect>, Props>(
  ({ value, onChange, placeholder = '', onSelect }, ref) => {
    const t = useTranslations('Common')
    const loadOptions = (inputValue: string, callback: (options: { name: string }[]) => void) => {
      if (controller) {
        controller.abort()
      }

      controller = new AbortController()
      const signal = controller.signal

      getCompanies({ search: inputValue }, signal)
        .then(data => callback(inputValue ? (data.length > 0 ? data : [{ name: inputValue }]) : data))
        .catch(() => {})
    }

    const handleChange = (selectedOption: { name: string }) => {
      if (onSelect) {
        onSelect(selectedOption ? selectedOption.name : '')
      }

      onChange(selectedOption ? selectedOption.name : '')
    }

    return (
      <AsyncSelect<any>
        cacheOptions
        isClearable
        ref={ref as any}
        className="text-xs"
        onChange={handleChange}
        theme={reactSelectTheme}
        placeholder={placeholder}
        loadOptions={loadOptions}
        classNamePrefix={'ain-select'}
        getOptionLabel={op => op.name}
        getOptionValue={op => String(op.name)}
        value={value ? { name: value } : undefined}
        loadingMessage={() => t('Select.Searching')}
        noOptionsMessage={() => t('Select.EnterTitle')}
        classNames={{ placeholder: () => 'line-clamp-1', container: () => 'ain-select-container' }}
      />
    )
  },
)

CompanySelect.displayName = 'CompanySelect'

export default CompanySelect
