/** biome-ignore-all lint/suspicious/noExplicitAny: fast fix*/

import { useTranslations } from 'next-intl'
import * as React from 'react'
import Select, { type ActionMeta, type OnChangeValue, type Props } from 'react-select'
import AsyncSelect from 'react-select/async'
import CreatableSelect from 'react-select/creatable'

import { cn, reactSelectTheme } from '@/lib/utils'

export interface SelectProps extends Props {
  size?: string
  isAsync?: boolean
  creatable?: boolean
  useLabelValue?: boolean
  onSelect?: (value: any) => void
}

const ReactSelect = React.forwardRef<React.ElementRef<typeof Select>, SelectProps>(
  (
    {
      value,
      options,
      onChange,
      isMulti,
      isAsync,
      onSelect,
      creatable,
      className,
      useLabelValue,
      size = 'default',
      placeholder = '',
      ...props
    },
    ref
  ) => {
    const t = useTranslations('')
    const MainSelect = isAsync ? AsyncSelect : creatable ? CreatableSelect : Select

    const sizes: Record<string, string> = {
      default: 'text-base',
      sm: 'text-xs'
    }

    const handleChange = (value: OnChangeValue<any, any>, actionMeta: ActionMeta<any>) => {
      if (onSelect) {
        onSelect(value)
      }

      if (onChange) {
        if (actionMeta.action === 'create-option') {
          onChange(isMulti || useLabelValue ? value : value?.value, actionMeta)
        } else {
          onChange(isMulti || useLabelValue ? value : value?.value, actionMeta)
        }
      }
    }

    const innerProps: SelectProps = {
      className: cn(sizes[size], 'ain-select-container', className),
      classNamePrefix: 'ain-select',
      isMulti,
      menuPlacement: 'auto',
      noOptionsMessage: () => t('Common.Select.NoOption'),
      onChange: handleChange,
      options,
      placeholder,
      theme: reactSelectTheme,
      value: isMulti || useLabelValue ? value : value ? { label: value, value: value } : null,

      ...props
    }

    if (creatable) {
      return (
        <MainSelect formatCreateLabel={(inputValue) => `${t('Common.Select.Create')}: ${inputValue}`} ref={ref} {...innerProps} />
      )
    }

    return <MainSelect ref={ref} {...innerProps} />
  }
)
ReactSelect.displayName = 'ReactSelect'

export { ReactSelect }
