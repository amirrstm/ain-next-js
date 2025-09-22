import { IconPlus } from '@tabler/icons-react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import AwardForm from './AwardForm'
import InterestForm from './InterestForm'
import InventionForm from './InventionForm'
import ReferenceForm from './ReferenceForm'
import SpeechForm from './SpeechForm'
import TeachingForm from './TeachingForm'
import VolunteerForm from './VolunteerForm'

import type { ResumeFormType } from '@/modules/resume/interface'

const BasicTab: React.FC = () => {
  const t = useTranslations('Resume')
  const form = useFormContext<ResumeFormType>()

  const interestRef = useRef<HTMLDivElement>(null)
  const teachingRef = useRef<HTMLDivElement>(null)
  const inventionRef = useRef<HTMLDivElement>(null)
  const speechRef = useRef<HTMLDivElement>(null)
  const volunteerRef = useRef<HTMLDivElement>(null)

  const interests = useWatch({ control: form.control, name: 'interests' })
  const teachings = useWatch({ control: form.control, name: 'teachings' })
  const inventions = useWatch({ control: form.control, name: 'inventions' })
  const speeches = useWatch({ control: form.control, name: 'speeches' })
  const volunteers = useWatch({ control: form.control, name: 'volunteers' })

  const onAddNewField = (field: string) => {
    switch (field) {
      case 'interest':
        form.setValue('interests', [{ name: '' }])
        if (interestRef.current) {
          interestRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        break

      case 'teaching':
        form.setValue('teachings', [
          {
            date: new Date(),
            institution: '',
            location: { city: '', country: 'ایران', state: '' },
            summary: '',
            title: ''
          }
        ])
        if (teachingRef.current) {
          teachingRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        break

      case 'invention':
        form.setValue('inventions', [{ date: new Date(), name: '', summary: '', url: '' }])
        if (inventionRef.current) {
          inventionRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        break

      case 'speech':
        form.setValue('speeches', [{ date: new Date(), name: '', summary: '', url: '' }])
        if (speechRef.current) {
          speechRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        break

      case 'volunteer':
        form.setValue('volunteers', [
          {
            endDate: new Date(),
            highlights: [{ value: '' }],
            organization: '',
            position: '',
            startDate: new Date(),
            summary: '',
            url: ''
          }
        ])
        if (volunteerRef.current) {
          volunteerRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        break
    }
  }

  return (
    <>
      <AwardForm />

      <ReferenceForm />

      <div ref={interestRef}>{interests && interests.length > 0 && <InterestForm />}</div>

      <div ref={teachingRef}>{teachings && teachings.length > 0 && <TeachingForm />}</div>

      <div ref={inventionRef}>{inventions && inventions.length > 0 && <InventionForm />}</div>

      <div ref={speechRef}>{speeches && speeches.length > 0 && <SpeechForm />}</div>

      <div ref={volunteerRef}>{volunteers && volunteers.length > 0 && <VolunteerForm />}</div>

      <div className="flex flex-wrap gap-3">
        {(!interests || interests.length === 0) && (
          <div className="flex-1">
            <AddButton onClick={() => onAddNewField('interest')} title={t('Interest.Title')} />
          </div>
        )}

        {(!teachings || teachings.length === 0) && (
          <div className="flex-auto sm:flex-1">
            <AddButton onClick={() => onAddNewField('teaching')} title={t('Teaching.Title')} />
          </div>
        )}

        {(!inventions || inventions.length === 0) && (
          <div className="flex-1">
            <AddButton onClick={() => onAddNewField('invention')} title={t('Invention.Title')} />
          </div>
        )}

        {(!speeches || speeches.length === 0) && (
          <div className="flex-auto sm:flex-1">
            <AddButton onClick={() => onAddNewField('speech')} title={t('Speech.Title')} />
          </div>
        )}

        {(!volunteers || volunteers.length === 0) && (
          <div className="flex-auto sm:flex-1">
            <AddButton onClick={() => onAddNewField('volunteer')} title={t('Volunteer.Title')} />
          </div>
        )}
      </div>
    </>
  )
}

export default BasicTab

const AddButton: React.FC<{ onClick: () => void; title: string }> = ({ onClick, title }) => {
  return (
    <div
      className={clsx(
        'cursor-pointer bg-card hover:border-primary',
        'flex flex-col items-center justify-center gap-2 rounded-md border border-muted border-dashed p-3 text-center'
      )}
      onClick={onClick}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
        <IconPlus className="h-4 w-4" />
      </div>
      <h3 className="text-sm">{title}</h3>
    </div>
  )
}
