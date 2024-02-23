import React from 'react'
import ReactCodeInput from 'react-code-input'

type Props = { name: string; value: string; onChange: (e: string) => void }
export const CodeInput: React.FC<Props> = ({ name, value, onChange }) => {
  return <ReactCodeInput fields={6} name={name} value={value} inputMode="numeric" onChange={onChange} />
}
