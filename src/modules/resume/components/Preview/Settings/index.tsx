import { IconX } from '@tabler/icons-react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'

import { ColorPicker } from '@/components/ui/color-picker'
import Loader from '@/components/ui/loader'
import { ReactSelect } from '@/components/ui/react-select'
import { Slider } from '@/components/ui/slider'
import { RESUME_FONTS } from '@/modules/resume/constants/resume.default'
import { updateResumeSettings } from '@/modules/resume/service'

import type { IResumeTemplateSettings } from '@/modules/resume/interface/resume'

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
      <div className="flex items-center justify-between border-b border-b-muted p-4">
        <div>
          <p>{t('Options.Title')}</p>
          <p className="text-gray-500 text-xs">{t('Options.Description')}</p>
        </div>

        <div className="cursor-pointer text-gray-400" onClick={onClose}>
          <IconX />
        </div>
      </div>

      {isLoading || !values ? (
        <div className="flex justify-center py-4">
          <div className="h-10 w-10">
            <Loader />
          </div>
        </div>
      ) : (
        <div className="space-y-4 p-4">
          {values.defaultFont && (
            <div className="flex rounded-md border border-input bg-white dark:bg-transparent">
              <div className="flex items-center border-e border-e-input px-3">
                <p className="text-sm">{t('Options.Fields.DefaultFont')}</p>
              </div>
              <div className="flex flex-1 items-center p-2">
                <ReactSelect
                  className="w-full"
                  onSelect={onSelectFont}
                  options={RESUME_FONTS}
                  placeholder={t('Options.Fields.DefaultFont')}
                  size="sm"
                  useLabelValue
                  value={RESUME_FONTS.find((f) => f.value === values.defaultFont)}
                />
              </div>
            </div>
          )}

          {values.nameColor && (
            <ColorPicker
              disabled={loading}
              label={t('Options.Fields.NameColor')}
              onBlur={saveSettings}
              onChange={(e) => onChangeColor(e, 'nameColor')}
              value={values.nameColor}
            />
          )}

          {values.jobTitleColor && (
            <ColorPicker
              disabled={loading}
              label={t('Options.Fields.JobTitleColor')}
              onBlur={saveSettings}
              onChange={(e) => onChangeColor(e, 'jobTitleColor')}
              value={values?.jobTitleColor as string}
            />
          )}

          {values.sectionTitleColor && (
            <ColorPicker
              disabled={loading}
              label={t('Options.Fields.SectionTitleColor')}
              onBlur={saveSettings}
              onChange={(e) => onChangeColor(e, 'sectionTitleColor')}
              value={values?.sectionTitleColor as string}
            />
          )}

          {values.placesColor && (
            <ColorPicker
              disabled={loading}
              label={t('Options.Fields.PlacesColor')}
              onBlur={saveSettings}
              onChange={(e) => onChangeColor(e, 'placesColor')}
              value={values?.placesColor as string}
            />
          )}

          {values.skillBarColor && (
            <ColorPicker
              disabled={loading}
              label={t('Options.Fields.SkillBarColor')}
              onBlur={saveSettings}
              onChange={(e) => onChangeColor(e, 'skillBarColor')}
              value={values?.skillBarColor as string}
            />
          )}

          {values.blockMargins && (
            <div className="rounded-md border border-input bg-white dark:bg-transparent">
              <div className="flex items-center border-b border-b-input px-3 py-2">
                <p className="text-sm">{t('Options.Fields.BlockMargins')}</p>
              </div>
              <div className="p-5">
                <Slider max={5} min={1} onValueChange={onChangeMargin} step={1} value={[Number(values?.blockMargins)]} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PreviewSettings
