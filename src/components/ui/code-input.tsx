import VerificationInput from 'react-verification-input'

import type React from 'react'

type Props = { error?: boolean; name: string; value: string; onChange: (e: string) => void; onBlur?: () => void }
export const CodeInput: React.FC<Props> = ({ name, value, onChange, onBlur, error }) => {
  return (
    <div className="w-full flex-1" id={name}>
      <VerificationInput
        autoFocus
        classNames={{
          character: `w-10 rounded-md border-gray-300 dark:border-neutral-500 dark:bg-transparent dark:text-gray-200 ${
            error && 'border-red-500'
          }`,
          container: 'w-full flex justify-center'
        }}
        inputProps={{ inputMode: 'numeric' }}
        onBlur={onBlur}
        onChange={onChange}
        validChars="0123456789"
        value={value}
      />
    </div>
  )
}
