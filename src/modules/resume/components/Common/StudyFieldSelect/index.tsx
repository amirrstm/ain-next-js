import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import AsyncSelect from 'react-select/async'

import { reactSelectTheme } from '@/lib/utils'
import { getStudyFields } from '@/modules/resume/service'

import type React from 'react'

let controller: AbortController

type Props = {
  value?: string
  placeholder?: string
  onBlur?: () => void
  onChange: (e: string) => void
  onSelect?: (e: string) => void
}

const StudyFieldSelect: React.FC<Props> = ({ value, onChange, placeholder = '', onSelect }) => {
  const t = useTranslations('Common')
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const loadOptions = (inputValue: string, callback: (options: { name: string }[]) => void) => {
    if (controller) {
      controller.abort()
    }

    controller = new AbortController()
    const signal = controller.signal

    getStudyFields({ search: inputValue }, signal)
      .then((data) => callback(inputValue ? (data.length > 0 ? data : [{ name: inputValue }]) : data))
      .catch(() => {})
  }

  const handleChange = (selectedOption: { name: string } | null) => {
    if (onSelect) {
      onSelect(selectedOption ? selectedOption.name : '')
    }

    onChange(selectedOption ? selectedOption.name : '')
  }

  const delayedLoadOptions = (inputValue: string, callback: (options: { name: string }[]) => void) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      loadOptions(inputValue, callback)
    }, 1000)
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
      loadOptions={delayedLoadOptions}
      noOptionsMessage={() => t('Select.EnterTitle')}
      onChange={handleChange}
      placeholder={placeholder}
      theme={reactSelectTheme}
      value={value ? { name: value } : undefined}
    />
  )
}

StudyFieldSelect.displayName = 'StudyFieldSelect'

export default StudyFieldSelect
