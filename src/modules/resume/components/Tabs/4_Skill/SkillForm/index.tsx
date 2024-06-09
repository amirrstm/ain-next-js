import { useTranslations } from 'next-intl'

import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { useI18nZodErrors } from '@/lib/zodValidation'
import { resumeDefaultValues } from '@/modules/resume/constants/resume.default'
import { ResumeFormType } from '@/modules/resume/interface'

import AddNew from '../../../Common/AddNew'
import SingleForm from './Form'

const SkillForm: React.FC = () => {
  useI18nZodErrors('resume.skill')
  const t = useTranslations('Resume.Skill')
  const form = useFormContext<ResumeFormType>()

  const { append, remove, move, fields } = useFieldArray({ control: form.control, name: 'skills' })

  return (
    <div className="bg-card rounded-lg border border-muted">
      <div className="p-3 sm:p-4 border-b border-b-muted">
        <h2 className="text-md sm:text-lg font-semibold">{t('Title')}</h2>
        <p className="text-xs sm:text-sm text-gray-400">{t('Description')}</p>
      </div>

      <div className="p-4 space-y-6">
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-12 gap-y-4 sm:gap-8">
            {fields.map((field, index) => (
              <div className="col-span-12 sm:col-span-6" key={field.id}>
                <SingleForm
                  remove={remove}
                  moveCard={move}
                  position={index}
                  fieldId={field.id}
                  hasMove={fields.length !== 1}
                />
              </div>
            ))}
          </div>
        </DndProvider>

        <AddNew title={t('AddNew')} onClick={() => append(resumeDefaultValues.skills[0])} />
      </div>
    </div>
  )
}

export default SkillForm
