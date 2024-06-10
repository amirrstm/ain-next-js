import { useTranslations } from 'next-intl'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import OccupationSelect from '../../Common/OccupationSelect'

interface Props {
  onSubmit: (occupation: string, description?: string) => void
}

const AICreate: React.FC<Props> = ({ onSubmit }) => {
  const t = useTranslations('Resume.Create.AI')
  const [occupation, setOccupation] = useState<string>()
  const [description, setDescription] = useState<string>()

  const handleSubmit = () => {
    if (!occupation) {
      return
    }

    onSubmit(occupation, description)
  }

  return (
    <div className="space-y-6 px-1 py-4">
      <div>
        <p className="text-xs mb-2">{t('Fields.Title')}</p>
        <OccupationSelect value={occupation} onChange={e => setOccupation(e)} placeholder={t('Fields.Placeholder')} />
      </div>

      <div>
        <p className="text-xs mb-2">{t('Fields.Description')}</p>
        <Textarea
          rows={5}
          size="sm"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder={t('Fields.DescriptionPlaceholder')}
        />
      </div>

      <div className="pt-6">
        <Button className="w-full" disabled={!occupation} onClick={handleSubmit}>
          {t('Fields.Submit')}
        </Button>
      </div>
    </div>
  )
}

export default AICreate
