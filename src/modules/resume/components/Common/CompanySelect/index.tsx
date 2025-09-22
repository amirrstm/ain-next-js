import { useTranslations } from 'next-intl'
import AsyncSelect from 'react-select/async'

import { reactSelectTheme } from '@/lib/utils'
import { getCompanies } from '@/modules/resume/service'

import type React from 'react'

let controller: AbortController

type Props = {
  value?: string
  placeholder?: string
  onBlur?: () => void
  onChange: (e: string) => void
  onSelect?: (e: string) => void
}

const CompanySelect: React.FC<Props> = ({ value, onChange, placeholder = '', onSelect }) => {
  const t = useTranslations('Common')
  const loadOptions = (inputValue: string, callback: (options: { name: string }[]) => void) => {
    if (controller) {
      controller.abort()
    }

    controller = new AbortController()
    const signal = controller.signal

    getCompanies({ search: inputValue }, signal)
      .then((data) => callback(inputValue ? (data.length > 0 ? data : [{ name: inputValue }]) : data))
      .catch(() => {})
  }

  const handleChange = (selectedOption: { name: string } | null) => {
    if (onSelect) {
      onSelect(selectedOption ? selectedOption.name : '')
    }

    onChange(selectedOption ? selectedOption.name : '')
  }

  return (
    <AsyncSelect<{ name: string }>
      cacheOptions
      className="text-xs"
      classNamePrefix={'ain-select'}
      classNames={{ container: () => 'ain-select-container', placeholder: () => 'line-clamp-1' }}
      getOptionLabel={(op) => op.name}
      getOptionValue={(op) => String(op.name)}
      isClearable
      loadingMessage={() => t('Select.Searching')}
      loadOptions={loadOptions}
      noOptionsMessage={() => t('Select.EnterTitle')}
      onChange={handleChange}
      placeholder={placeholder}
      theme={reactSelectTheme}
      value={value ? { name: value } : undefined}
    />
  )
}

CompanySelect.displayName = 'CompanySelect'

export default CompanySelect
