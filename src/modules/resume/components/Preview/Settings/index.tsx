import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import React, { useEffect } from 'react'

import { ColorPicker } from '@/components/ui/color-picker'
import Loader from '@/components/ui/loader'
import { ReactSelect } from '@/components/ui/react-select'

import { IResumeTemplateSettings } from '@/modules/resume/interface/resume'
import { updateResumeSettings } from '@/modules/resume/service'

interface Props {
  isLoading?: boolean
  onReload: () => void
  settings?: IResumeTemplateSettings
}

const fonts = [
  {
    label: 'ایران سنس',
    value: 'IranSans',
  },
  {
    label: 'یکان بخ',
    value: 'YekanBakh',
  },
  {
    label: 'وزیر متن',
    value: 'Vazirmatn',
  },
]

const PreviewSettings: React.FC<Props> = ({ onReload, settings, isLoading }) => {
  const { resumeId } = useParams()
  const t = useTranslations('Resume.Settings')
  const [loading, setLoading] = React.useState(false)

  const [values, setValues] = React.useState<IResumeTemplateSettings>()

  useEffect(() => {
    if (settings) {
      setValues(settings)
    }
  }, [settings])

  const onChangeColor = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setValues({ ...values, [key]: e.target.value })
  }

  const onSelectFont = ({ value }: { value: string }) => {
    setValues({ ...values, defaultFont: value })

    setLoading(true)
    updateResumeSettings(resumeId as string, { ...values, defaultFont: value }).then(() => {
      onReload()
      setLoading(false)
    })
  }

  const saveSettings = () => {
    if (values && values !== settings) {
      setLoading(true)
      updateResumeSettings(resumeId as string, values).then(() => {
        onReload()
        setLoading(false)
      })
    }
  }

  return (
    <div>
      <div className="border-b border-b-muted p-4">
        <p>{t('Options.Title')}</p>
        <p className="text-xs text-gray-500">{t('Options.Description')}</p>
      </div>

      {isLoading || !values ? (
        <div className="flex justify-center py-4">
          <div className="w-10 h-10">
            <Loader />
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          <div className="border border-input rounded-md flex">
            <div className="border-e border-e-input flex items-center px-3">
              <p className="text-sm">{t('Options.Fields.DefaultFont')}</p>
            </div>
            <div className="p-2 flex items-center flex-1">
              <ReactSelect
                size="sm"
                useLabelValue
                options={fonts}
                className="w-full"
                onSelect={onSelectFont}
                placeholder={t('Options.Fields.DefaultFont')}
                value={fonts.find(f => f.value === values.defaultFont)}
              />
            </div>
          </div>

          <ColorPicker
            disabled={loading}
            onBlur={saveSettings}
            value={values.nameColor}
            label={t('Options.Fields.NameColor')}
            onChange={e => onChangeColor(e, 'nameColor')}
          />

          <ColorPicker
            disabled={loading}
            onBlur={saveSettings}
            value={values?.jobTitleColor as string}
            label={t('Options.Fields.JobTitleColor')}
            onChange={e => onChangeColor(e, 'jobTitleColor')}
          />

          <ColorPicker
            disabled={loading}
            onBlur={saveSettings}
            value={values?.sectionTitleColor as string}
            label={t('Options.Fields.SectionTitleColor')}
            onChange={e => onChangeColor(e, 'sectionTitleColor')}
          />

          <ColorPicker
            disabled={loading}
            onBlur={saveSettings}
            value={values?.placesColor as string}
            label={t('Options.Fields.PlacesColor')}
            onChange={e => onChangeColor(e, 'placesColor')}
          />
        </div>
      )}
    </div>
  )
}

export default PreviewSettings
