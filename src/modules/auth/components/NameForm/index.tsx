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
    <div className="p-6 w-full">
      <div className="text-center">
        <h1 className="text-3xl font-bold from-primary to-textWhite bg-gradient-to-r bg-clip-text text-transparent">
          {t('NameTitle')}
        </h1>

        <p className="text-xs text-gray-400 max-w-[80%] mx-auto leading-relaxed mt-2">{t('Fields.Name')}</p>
      </div>

      <div className="py-4">
        <Input
          value={value}
          loading={loading}
          onKeyDown={onKeyDown}
          onRequestSubmit={onRequestSubmit}
          onChange={e => setValue(e.target.value)}
          placeholder={t('Fields.NamePlaceholder')}
        />
      </div>

      <div className="font-light text-sm text-center">
        <Link href={returnUrl ? returnUrl : '/app'} className="text-primary dark:text-gray-400 cursor-pointer">
          {t('Skip')}
        </Link>
      </div>
    </div>
  )
}

export default NameForm
