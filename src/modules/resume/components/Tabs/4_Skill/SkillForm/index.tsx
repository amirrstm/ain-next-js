import { useTranslations } from 'next-intl'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { useI18nZodErrors } from '@/lib/zodValidation'
import { resumeDefaultValues } from '@/modules/resume/constants/resume.default'

import AddNew from '../../../Common/AddNew'
import SingleForm from './Form'

import type React from 'react'
import type { ResumeFormType } from '@/modules/resume/interface'

const SkillForm: React.FC = () => {
  useI18nZodErrors('resume.skill')
  const t = useTranslations('Resume.Skill')
  const form = useFormContext<ResumeFormType>()

  const { append, remove, move, fields } = useFieldArray({ control: form.control, name: 'skills' })

  return (
    <div className="rounded-lg border border-muted bg-card">
      <div className="border-b border-b-muted p-3 sm:p-4">
        <h2 className="font-semibold text-md sm:text-lg">{t('Title')}</h2>
        <p className="text-gray-400 text-xs sm:text-sm">{t('Description')}</p>
      </div>

      <div className="space-y-6 p-4">
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-12 gap-y-4 sm:gap-8">
            {fields.map((field, index) => (
              <div className="col-span-12 sm:col-span-6" key={field.id}>
                <SingleForm fieldId={field.id} hasMove={fields.length !== 1} moveCard={move} position={index} remove={remove} />
              </div>
            ))}
          </div>
        </DndProvider>

        <AddNew onClick={() => append(resumeDefaultValues.skills[0])} title={t('AddNew')} />
      </div>
    </div>
  )
}

export default SkillForm
