import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { IconX } from '@tabler/icons-react'
import React, { useEffect } from 'react'

import { ColorPicker } from '@/components/ui/color-picker'
import Loader from '@/components/ui/loader'
import { ReactSelect } from '@/components/ui/react-select'
import { Slider } from '@/components/ui/slider'

import { RESUME_FONTS } from '@/modules/resume/constants/resume.default'
import { IResumeTemplateSettings } from '@/modules/resume/interface/resume'
import { updateResumeSettings } from '@/modules/resume/service'

interface Props {
  isLoading?: boolean
  onReload: () => void
  onClose?: () => void
  settings?: IResumeTemplateSettings
}

const PreviewSettings: React.FC<Props> = ({ onClose, onReload, settings, isLoading }) => {
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

  const onChangeMargin = (value: number[]) => {
    setValues({ ...values, blockMargins: String(value[0]) })

    setLoading(true)
    updateResumeSettings(resumeId as string, { ...values, blockMargins: String(value[0]) }).then(() => {
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
      <div className="border-b border-b-muted p-4 flex items-center justify-between">
        <div>
          <p>{t('Options.Title')}</p>
          <p className="text-xs text-gray-500">{t('Options.Description')}</p>
        </div>

        <div onClick={onClose} className="cursor-pointer text-gray-400">
          <IconX />
        </div>
      </div>

      {isLoading || !values ? (
        <div className="flex justify-center py-4">
          <div className="w-10 h-10">
            <Loader />
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {values.defaultFont && (
            <div className="border border-input rounded-md flex bg-white dark:bg-transparent">
              <div className="border-e border-e-input flex items-center px-3">
                <p className="text-sm">{t('Options.Fields.DefaultFont')}</p>
              </div>
              <div className="p-2 flex items-center flex-1">
                <ReactSelect
                  size="sm"
                  useLabelValue
                  options={RESUME_FONTS}
                  className="w-full"
                  onSelect={onSelectFont}
                  placeholder={t('Options.Fields.DefaultFont')}
                  value={RESUME_FONTS.find(f => f.value === values.defaultFont)}
                />
              </div>
            </div>
          )}

          {values.nameColor && (
            <ColorPicker
              disabled={loading}
              onBlur={saveSettings}
              value={values.nameColor}
              label={t('Options.Fields.NameColor')}
              onChange={e => onChangeColor(e, 'nameColor')}
            />
          )}

          {values.jobTitleColor && (
            <ColorPicker
              disabled={loading}
              onBlur={saveSettings}
              value={values?.jobTitleColor as string}
              label={t('Options.Fields.JobTitleColor')}
              onChange={e => onChangeColor(e, 'jobTitleColor')}
            />
          )}

          {values.sectionTitleColor && (
            <ColorPicker
              disabled={loading}
              onBlur={saveSettings}
              value={values?.sectionTitleColor as string}
              label={t('Options.Fields.SectionTitleColor')}
              onChange={e => onChangeColor(e, 'sectionTitleColor')}
            />
          )}

          {values.placesColor && (
            <ColorPicker
              disabled={loading}
              onBlur={saveSettings}
              value={values?.placesColor as string}
              label={t('Options.Fields.PlacesColor')}
              onChange={e => onChangeColor(e, 'placesColor')}
            />
          )}

          {values.skillBarColor && (
            <ColorPicker
              disabled={loading}
              onBlur={saveSettings}
              value={values?.skillBarColor as string}
              label={t('Options.Fields.SkillBarColor')}
              onChange={e => onChangeColor(e, 'skillBarColor')}
            />
          )}

          {values.blockMargins && (
            <div className="border border-input rounded-md bg-white dark:bg-transparent">
              <div className="border-b border-b-input flex items-center py-2 px-3">
                <p className="text-sm">{t('Options.Fields.BlockMargins')}</p>
              </div>
              <div className="p-5">
                <Slider
                  max={5}
                  min={1}
                  step={1}
                  onValueChange={onChangeMargin}
                  value={[Number(values?.blockMargins)]}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PreviewSettings
