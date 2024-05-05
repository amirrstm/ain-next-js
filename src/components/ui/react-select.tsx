import * as React from 'react'
import Select, { ActionMeta, OnChangeValue, Props } from 'react-select'
import AsyncSelect from 'react-select/async'
import CreatableSelect from 'react-select/creatable'

import { cn, reactSelectTheme } from '@/lib/utils'

export interface SelectProps extends Props {
  size?: string
  isAsync?: boolean
  creatable?: boolean
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
      size = 'default',
      placeholder = '',
      ...props
    },
    ref,
  ) => {
    const MainSelect = isAsync ? AsyncSelect : creatable ? CreatableSelect : Select

    const sizes: Record<string, string> = {
      sm: 'text-xs',
      default: 'text-base',
    }

    const handleChange = (value: OnChangeValue<any, any>, actionMeta: ActionMeta<any>) => {
      if (onSelect) {
        onSelect(value)
      }

      console.log(value, actionMeta)

      if (actionMeta.action === 'create-option') {
        onChange?.(isMulti ? value : value?.value, actionMeta)
      } else {
        onChange?.(isMulti ? value : value?.value, actionMeta)
      }
    }

    const innerProps: SelectProps = {
      options,
      isMulti,
      placeholder,
      menuPlacement: 'auto',
      onChange: handleChange,
      classNamePrefix: 'ain-select',
      noOptionsMessage: () => 'موردی یافت نشد',
      className: cn(sizes[size], 'ain-select-container', className),
      value: isMulti ? value : value ? { value: value, label: value } : null,
      theme: reactSelectTheme,

      ...props,
    }

    if (creatable) {
      return <MainSelect ref={ref} formatCreateLabel={inputValue => `ایجاد: ${inputValue}`} {...innerProps} />
    }

    return <MainSelect ref={ref} {...innerProps} />
  },
)
ReactSelect.displayName = 'ReactSelect'

export { ReactSelect }
