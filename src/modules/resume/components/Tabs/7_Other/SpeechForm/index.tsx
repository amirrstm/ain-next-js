import { useTranslations } from 'next-intl'

import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { useI18nZodErrors } from '@/lib/zodValidation'
import { ResumeFormType } from '@/modules/resume/interface'

import AddNew from '../../../Common/AddNew'
import SingleForm from './Form'

const SpeechForm: React.FC = () => {
  useI18nZodErrors('resume.speech')
  const t = useTranslations('Resume.Speech')
  const form = useFormContext<ResumeFormType>()

  const { append, remove, move, fields } = useFieldArray({ control: form.control, name: 'speeches' })

  return (
    <div className="bg-card rounded-lg border border-muted">
      <div className="p-3 sm:p-4 border-b border-b-muted">
        <h2 className="text-md sm:text-lg font-semibold">{t('Title')}</h2>
      </div>

      <div className="p-4 space-y-6">
        <DndProvider backend={HTML5Backend}>
          {fields.map((field, index) => (
            <SingleForm
              remove={remove}
              moveCard={move}
              position={index}
              fieldId={field.id}
              key={field.id}
              hasMove={fields.length !== 1}
            />
          ))}
        </DndProvider>

        <AddNew
          title={t('AddNew')}
          onClick={() =>
            append({
              name: '',
              url: '',
              summary: '',
              date: new Date(),
            })
          }
        />
      </div>
    </div>
  )
}

export default SpeechForm
