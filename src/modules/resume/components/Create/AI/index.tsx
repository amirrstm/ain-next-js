import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import OccupationSelect from '../../Common/OccupationSelect'

import type React from 'react'

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
        <p className="mb-2 text-xs">{t('Fields.Title')}</p>
        <OccupationSelect onChange={(e) => setOccupation(e)} placeholder={t('Fields.Placeholder')} value={occupation} />
      </div>

      <div>
        <p className="mb-2 text-xs">{t('Fields.Description')}</p>
        <Textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t('Fields.DescriptionPlaceholder')}
          rows={5}
          size="sm"
          value={description}
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
