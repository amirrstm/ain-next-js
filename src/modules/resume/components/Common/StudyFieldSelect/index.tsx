import { useTranslations } from 'next-intl'

import React, { useRef } from 'react'
import AsyncSelect from 'react-select/async'

import { reactSelectTheme } from '@/lib/utils'
import { getStudyFields } from '@/modules/resume/service'

let controller: AbortController

type Props = {
  value?: string
  placeholder?: string
  onBlur?: () => void
  onChange: (e: string) => void
  onSelect?: (e: string) => void
}

const StudyFieldSelect = React.forwardRef<React.ElementRef<typeof AsyncSelect>, Props>(
  ({ value, onChange, placeholder = '', onSelect }, ref) => {
    const t = useTranslations('Common')
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

    const loadOptions = (inputValue: string, callback: (options: { name: string }[]) => void) => {
      if (controller) {
        controller.abort()
      }

      controller = new AbortController()
      const signal = controller.signal

      getStudyFields({ search: inputValue }, signal)
        .then(data => callback(inputValue ? (data.length > 0 ? data : [{ name: inputValue }]) : data))
        .catch(() => {})
    }

    const handleChange = (selectedOption: { name: string }) => {
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
      <AsyncSelect<any>
        cacheOptions
        isClearable
        ref={ref as any}
        className="text-xs"
        onChange={handleChange}
        theme={reactSelectTheme}
        placeholder={placeholder}
        classNamePrefix={'ain-select'}
        getOptionLabel={op => op.name}
        loadOptions={delayedLoadOptions}
        getOptionValue={op => String(op.name)}
        value={value ? { name: value } : undefined}
        loadingMessage={() => t('Select.Searching')}
        noOptionsMessage={() => t('Select.EnterTitle')}
        classNames={{ placeholder: () => 'line-clamp-1', container: () => 'ain-select-container' }}
      />
    )
  },
)

StudyFieldSelect.displayName = 'StudyFieldSelect'

export default StudyFieldSelect
