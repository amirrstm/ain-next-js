import { useTranslations } from 'next-intl'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { useI18nZodErrors } from '@/lib/zodValidation'
import { resumeDefaultValues } from '@/modules/resume/constants/resume.default'

import AddNew from '../../Common/AddNew'
import WorkForm from './WorkForm'

import type React from 'react'
import type { ResumeFormType } from '@/modules/resume/interface'

const WorkTab: React.FC = () => {
  useI18nZodErrors('resume.work')
  const t = useTranslations('Resume.Work')
  const form = useFormContext<ResumeFormType>()

  const { append, remove, move, fields } = useFieldArray({ control: form.control, name: 'works' })

  return (
    <div className="rounded-lg border border-muted bg-card">
      <div className="border-b border-b-muted p-3 sm:p-4">
        <h2 className="font-semibold text-md sm:text-lg">{t('Title')}</h2>
        <p className="text-gray-400 text-xs sm:text-sm">{t('Description')}</p>
      </div>

      <div className="space-y-6 p-4">
        <DndProvider backend={HTML5Backend}>
          {fields.map((field, index) => (
            <WorkForm
              fieldId={field.id}
              hasMove={fields.length !== 1}
              key={field.id}
              moveCard={move}
              position={index}
              remove={remove}
            />
          ))}
        </DndProvider>

        <AddNew onClick={() => append(resumeDefaultValues.works[0])} title={t('AddNew')} />
      </div>
    </div>
  )
}

export default WorkTab
