import clsx from 'clsx'
import React from 'react'
import ReactCodeInput from 'react-code-input'

import { YekanBakhNumFont } from '@/styles/fonts'

type Props = { error: boolean; name: string; value: string; onChange: (e: string) => void; lng: string }
export const CodeInput: React.FC<Props> = ({ name, value, onChange, lng, error }) => {
  console.log(error)
  return (
    <ReactCodeInput
      autoFocus
      fields={6}
      name={name}
      value={value}
      isValid={!error}
      inputMode="numeric"
      className={clsx(lng === 'fa' && YekanBakhNumFont.className, '!flex w-full gap-2')}
      onChange={onChange}
      inputStyleInvalid={{
        textAlign: 'center',
        fontSize: '1.5rem',
        padding: '0.5rem',
        borderRadius: '0.5rem',
        width: 'calc(100% / 6)',
        border: '1px solid #d50000',
      }}
      inputStyle={{
        textAlign: 'center',
        fontSize: '1.5rem',
        padding: '0.5rem',
        borderRadius: '0.5rem',
        width: 'calc(100% / 6)',
        border: '1px solid #e5e5e5',
      }}
    />
  )
}
