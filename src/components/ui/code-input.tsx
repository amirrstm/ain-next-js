import React from 'react'
import VerificationInput from 'react-verification-input'

type Props = { error: boolean; name: string; value: string; onChange: (e: string) => void; onBlur?: () => void }
export const CodeInput: React.FC<Props> = ({ name, value, onChange, onBlur, error }) => {
  return (
    <div id={name} className="w-full flex-1">
      <VerificationInput
        autoFocus
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        validChars="0123456789"
        inputProps={{ inputMode: 'numeric' }}
        classNames={{
          container: 'w-full flex justify-center',
          character: `w-10 rounded-md border-gray-300 ${error && 'border-red-500'}`,
        }}
      />
    </div>
  )
}
