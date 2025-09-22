'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

import { Link } from '@/components/ui/navigation'

import { Input } from './Input'

type Props = { loading: boolean; returnUrl?: string; onSubmit: (data: { name: string }) => void }
const NameForm: React.FC<Props> = ({ loading, returnUrl, onSubmit }) => {
  const t = useTranslations('Auth')
  const [value, setValue] = useState('')

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onRequestSubmit()
    }
  }

  const onRequestSubmit = () => {
    if (!value || value.length === 0) {
      toast.error(t('Fields.NameError'))
      return
    }

    onSubmit({ name: value })
  }

  return (
    <div className="w-full p-6">
      <div className="text-center">
        <h1 className="bg-gradient-to-r from-primary to-textWhite bg-clip-text font-bold text-3xl text-transparent">
          {t('NameTitle')}
        </h1>

        <p className="mx-auto mt-2 max-w-[80%] text-gray-400 text-xs leading-relaxed">{t('Fields.Name')}</p>
      </div>

      <div className="py-4">
        <Input
          loading={loading}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          onRequestSubmit={onRequestSubmit}
          placeholder={t('Fields.NamePlaceholder')}
          value={value}
        />
      </div>

      <div className="text-center font-light text-sm">
        <Link className="cursor-pointer text-primary dark:text-gray-400" href={returnUrl ? returnUrl : '/app'}>
          {t('Skip')}
        </Link>
      </div>
    </div>
  )
}

export default NameForm
