import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import { IconCheck, IconX } from '@tabler/icons-react'
import clsx from 'clsx'
import React from 'react'

import Loader from '@/components/ui/loader'

import useTemplates from '@/modules/resume/hooks/useTemplates'
import { updateResumeTemplate } from '@/modules/resume/service'

interface Props {
  template?: string
  onClose?: () => void
  onReload: () => void
}

const PreviewTemplates: React.FC<Props> = ({ template: resumeTemplate, onClose, onReload }) => {
  const { resumeId } = useParams()
  const t = useTranslations('Resume.Settings')
  const { isLoading, data } = useTemplates()

  const onSelect = (id: string) => {
    updateResumeTemplate(resumeId as string, { template: id }).then(onReload)
  }

  return (
    <div>
      <div className="border-b border-b-muted p-4 flex items-center justify-between">
        <div>
          <p>{t('Template.Title')}</p>
          <p className="text-xs text-gray-500">{t('Template.Description')}</p>
        </div>

        <div onClick={onClose} className="cursor-pointer text-gray-400">
          <IconX />
        </div>
      </div>

      {isLoading || !data ? (
        <div className="flex justify-center py-4">
          <div className="w-10 h-10">
            <Loader />
          </div>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-12 gap-3">
          {data.map(template => (
            <div key={template._id} className="col-span-6">
              <div
                onClick={() => onSelect(template._id)}
                className={clsx(
                  'group relative border-4',
                  'rounded-md overflow-hidden transition-all duration-200 ease-in-out cursor-pointer',
                  {
                    'border-green-500 pointer-events-none opacity-75': template._id === resumeTemplate,
                    'border-transparent hover:border-primary': template._id !== resumeTemplate,
                  },
                )}
              >
                <div
                  className={clsx(
                    'absolute bottom-2 left-1/2 -translate-x-1/2 bg-card text-white p-1 rounded-md',
                    'w-14 text-center group-hover:bg-primary transition-all duration-200 ease-in-out',
                    { 'bg-green-600': template._id === resumeTemplate },
                  )}
                >
                  <p className="text-xs">{template.name}</p>
                </div>

                {template._id === resumeTemplate && (
                  <div className="w-6 h-6 rounded-full bg-green-600 absolute right-1 top-1 flex items-center justify-center">
                    <IconCheck className="w-4 h-4" />
                  </div>
                )}

                <Image alt={template.name} src={template.image} width={300} height={200} className="rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PreviewTemplates
