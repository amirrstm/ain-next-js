import { useTranslations } from 'next-intl'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { useI18nZodErrors } from '@/lib/zodValidation'
import { resumeDefaultValues } from '@/modules/resume/constants/resume.default'

import AddNew from '../../Common/AddNew'
import EducationForm from './EducationForm'

import type React from 'react'
import type { ResumeFormType } from '@/modules/resume/interface'

const EducationTab: React.FC = () => {
  useI18nZodErrors('resume.education')
  const t = useTranslations('Resume.Education')
  const form = useFormContext<ResumeFormType>()

  const {
    append,
    remove,
    move: moveEducation,
    fields: educationFields
  } = useFieldArray({ control: form.control, name: 'educations' })

  return (
    <div className="rounded-lg border border-muted bg-card">
      <div className="border-b border-b-muted p-3 sm:p-4">
        <h2 className="font-semibold text-md sm:text-lg">{t('Title')}</h2>
        <p className="text-gray-400 text-xs sm:text-sm">{t('Description')}</p>
      </div>

      <div className="space-y-6 p-4">
        <DndProvider backend={HTML5Backend}>
          {educationFields.map((field, index) => (
            <EducationForm
              fieldId={field.id}
              hasMove={educationFields.length !== 1}
              key={field.id}
              moveCard={moveEducation}
              position={index}
              remove={remove}
            />
          ))}
        </DndProvider>

        <AddNew onClick={() => append(resumeDefaultValues.educations[0])} title={t('AddNew')} />
      </div>
    </div>
  )
}

export default EducationTab
