import { IconBolt, IconCash, IconClick, IconClock, IconEaseInOutControlPoints, IconSparkles } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import type React from 'react'
import type { ReactNode } from 'react'

const Benefits: React.FC = () => {
  const t = useTranslations('Layout.Home')

  return (
    <div className="relative z-[1] mx-auto max-w-6xl px-6 py-12">
      <div className="flex w-14 justify-center rounded-full bg-primary py-1 text-white text-xs tracking-widest shadow-primary shadow-xl dark:text-foreground">
        {t('Benefits.Title')}
      </div>

      <h1 className="my-6 block font-bold text-2xl md:text-4xl">{t('Benefits.Subtitle')}</h1>

      <div className="grid grid-cols-11 gap-4 md:mt-12">
        <div className="col-span-11 md:col-span-5">
          <SingleBox
            description={t('Benefits.UseCase.Description')}
            icon={<IconSparkles className="h-10 w-10 text-primary" />}
            title={t('Benefits.UseCase.Title')}
          />
        </div>

        <div className="col-span-11 md:col-span-3">
          <SingleBox
            description={t('Benefits.Time.Description')}
            icon={<IconClock className="h-10 w-10 text-primary" />}
            title={t('Benefits.Time.Title')}
          />
        </div>

        <div className="col-span-11 md:col-span-3">
          <SingleBox
            description={t('Benefits.Use.Description')}
            icon={<IconClick className="h-10 w-10 text-primary" />}
            title={t('Benefits.Use.Title')}
          />
        </div>

        <div className="col-span-11 md:col-span-4">
          <SingleBox
            description={t('Benefits.Money.Description')}
            icon={<IconCash className="h-10 w-10 text-primary" />}
            title={t('Benefits.Money.Title')}
          />
        </div>

        <div className="col-span-11 md:col-span-3">
          <SingleBox
            description={t('Benefits.Plagiarism.Description')}
            icon={<IconBolt className="h-10 w-10 text-primary" />}
            title={t('Benefits.Plagiarism.Title')}
          />
        </div>

        <div className="col-span-11 md:col-span-4">
          <SingleBox
            description={t('Benefits.Workflow.Description')}
            icon={<IconEaseInOutControlPoints className="h-10 w-10 text-primary" />}
            title={t('Benefits.Workflow.Title')}
          />
        </div>
      </div>
    </div>
  )
}

export default Benefits

const SingleBox: React.FC<{ title: string; description: string; icon: ReactNode }> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-muted bg-background p-4">
      {icon}
      <div>
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="mt-2 font-light text-sm">{description}</p>
      </div>
    </div>
  )
}
