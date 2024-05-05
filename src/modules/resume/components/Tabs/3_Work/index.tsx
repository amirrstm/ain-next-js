import { useTranslations } from 'next-intl'

import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { useI18nZodErrors } from '@/lib/zodValidation'
import { resumeDefaultValues } from '@/modules/resume/constants/resume.default'
import { ResumeFormType } from '@/modules/resume/interface'

import AddNew from '../../Common/AddNew'
import WorkForm from './WorkForm'

const WorkTab: React.FC = () => {
  useI18nZodErrors('resume.work')
  const t = useTranslations('Resume.Work')
  const form = useFormContext<ResumeFormType>()

  const { append, remove, move, fields } = useFieldArray({ control: form.control, name: 'works' })

  return (
    <div className="bg-background rounded-lg border border-muted">
      <div className="p-3 sm:p-4 border-b border-b-muted">
        <h2 className="text-md sm:text-lg font-semibold">{t('Title')}</h2>
        <p className="text-xs sm:text-sm text-gray-400">{t('Description')}</p>
      </div>

      <div className="p-4 space-y-6">
        <DndProvider backend={HTML5Backend}>
          {fields.map((field, index) => (
            <WorkForm
              key={field.id}
              fieldId={field.id}
              position={index}
              remove={remove}
              moveCard={move}
              hasMove={fields.length !== 1}
            />
          ))}
        </DndProvider>

        <AddNew title={t('AddNew')} onClick={() => append(resumeDefaultValues.works[0])} />
      </div>
    </div>
  )
}

export default WorkTab
