import { IconCheck, IconX } from '@tabler/icons-react'
import clsx from 'clsx'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import Loader from '@/components/ui/loader'
import useTemplates from '@/modules/resume/hooks/useTemplates'
import { updateResumeTemplate } from '@/modules/resume/service'

import type React from 'react'

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
      <div className="flex items-center justify-between border-b border-b-muted p-4">
        <div>
          <p>{t('Template.Title')}</p>
          <p className="text-gray-500 text-xs">{t('Template.Description')}</p>
        </div>

        <div className="cursor-pointer text-gray-400" onClick={onClose}>
          <IconX />
        </div>
      </div>

      {isLoading || !data ? (
        <div className="flex justify-center py-4">
          <div className="h-10 w-10">
            <Loader />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-3 p-4">
          {data.map((template) => (
            <div className="col-span-6" key={template._id}>
              <div
                className={clsx(
                  'group relative border-4',
                  'cursor-pointer overflow-hidden rounded-md transition-all duration-200 ease-in-out',
                  {
                    'border-transparent hover:border-primary': template._id !== resumeTemplate,
                    'pointer-events-none border-green-500 opacity-75': template._id === resumeTemplate
                  }
                )}
                onClick={() => onSelect(template._id)}
              >
                <div
                  className={clsx(
                    '-translate-x-1/2 absolute bottom-2 left-1/2 rounded-md bg-card p-1 text-white',
                    'w-14 text-center transition-all duration-200 ease-in-out group-hover:bg-primary',
                    { 'bg-green-600': template._id === resumeTemplate }
                  )}
                >
                  <p className="text-xs">{template.name}</p>
                </div>

                {template._id === resumeTemplate && (
                  <div className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
                    <IconCheck className="h-4 w-4" />
                  </div>
                )}

                <Image alt={template.name} className="rounded-sm" height={200} src={template.image} width={300} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PreviewTemplates
