import { useTranslations } from 'next-intl'

import { IconPlus } from '@tabler/icons-react'
import clsx from 'clsx'
import { useRef } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { ResumeFormType } from '@/modules/resume/interface'

import AwardForm from './AwardForm'
import InterestForm from './InterestForm'
import InventionForm from './InventionForm'
import ReferenceForm from './ReferenceForm'
import SpeechForm from './SpeechForm'
import TeachingForm from './TeachingForm'
import VolunteerForm from './VolunteerForm'

const BasicTab: React.FC = () => {
  const t = useTranslations('Resume')
  const form = useFormContext<ResumeFormType>()

  const interestRef = useRef<HTMLDivElement>(null)
  const teachingRef = useRef<HTMLDivElement>(null)
  const inventionRef = useRef<HTMLDivElement>(null)
  const speechRef = useRef<HTMLDivElement>(null)
  const volunteerRef = useRef<HTMLDivElement>(null)

  const interests = useWatch({ name: 'interests', control: form.control })
  const teachings = useWatch({ name: 'teachings', control: form.control })
  const inventions = useWatch({ name: 'inventions', control: form.control })
  const speeches = useWatch({ name: 'speeches', control: form.control })
  const volunteers = useWatch({ name: 'volunteers', control: form.control })

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
            title: '',
            summary: '',
            institution: '',
            date: new Date(),
            location: { city: '', state: '', country: 'ایران' },
          },
        ])
        if (teachingRef.current) {
          teachingRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        break

      case 'invention':
        form.setValue('inventions', [{ url: '', name: '', date: new Date(), summary: '' }])
        if (inventionRef.current) {
          inventionRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        break

      case 'speech':
        form.setValue('speeches', [{ date: new Date(), summary: '', name: '', url: '' }])
        if (speechRef.current) {
          speechRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        break

      case 'volunteer':
        form.setValue('volunteers', [
          {
            url: '',
            summary: '',
            position: '',
            organization: '',
            endDate: new Date(),
            startDate: new Date(),
            highlights: [{ value: '' }],
          },
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
      onClick={onClick}
      className={clsx(
        'hover:border-primary cursor-pointer bg-card',
        'border border-dashed border-muted p-3 rounded-md flex items-center justify-center text-center gap-2 flex-col',
      )}
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white">
        <IconPlus className="w-4 h-4" />
      </div>
      <h3 className="text-sm">{title}</h3>
    </div>
  )
}
