import { useTranslations } from 'next-intl'

import { IconBolt, IconCash, IconClick, IconClock, IconEaseInOutControlPoints, IconSparkles } from '@tabler/icons-react'
import React, { ReactNode } from 'react'

const Benefits: React.FC = () => {
  const t = useTranslations('Layout.Home')

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 relative z-[1]">
      <div className="py-1 w-14 rounded-full bg-primary text-foreground flex justify-center text-xs shadow-xl shadow-primary tracking-widest">
        {t('Benefits.Title')}
      </div>

      <h1 className="text-2xl md:text-4xl font-bold my-6 block">{t('Benefits.Subtitle')}</h1>

      <div className="grid grid-cols-11 gap-4 md:mt-12">
        <div className="col-span-11 md:col-span-5">
          <SingleBox
            title={t('Benefits.UseCase.Title')}
            description={t('Benefits.UseCase.Description')}
            icon={<IconSparkles className="w-10 h-10 text-primary" />}
          />
        </div>

        <div className="col-span-11 md:col-span-3">
          <SingleBox
            title={t('Benefits.Time.Title')}
            description={t('Benefits.Time.Description')}
            icon={<IconClock className="w-10 h-10 text-primary" />}
          />
        </div>

        <div className="col-span-11 md:col-span-3">
          <SingleBox
            title={t('Benefits.Use.Title')}
            description={t('Benefits.Use.Description')}
            icon={<IconClick className="w-10 h-10 text-primary" />}
          />
        </div>

        <div className="col-span-11 md:col-span-4">
          <SingleBox
            title={t('Benefits.Money.Title')}
            description={t('Benefits.Money.Description')}
            icon={<IconCash className="w-10 h-10 text-primary" />}
          />
        </div>

        <div className="col-span-11 md:col-span-3">
          <SingleBox
            title={t('Benefits.Plagiarism.Title')}
            description={t('Benefits.Plagiarism.Description')}
            icon={<IconBolt className="w-10 h-10 text-primary" />}
          />
        </div>

        <div className="col-span-11 md:col-span-4">
          <SingleBox
            title={t('Benefits.Workflow.Title')}
            description={t('Benefits.Workflow.Description')}
            icon={<IconEaseInOutControlPoints className="w-10 h-10 text-primary" />}
          />
        </div>
      </div>
    </div>
  )
}

export default Benefits

const SingleBox: React.FC<{ title: string; description: string; icon: ReactNode }> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col gap-6 bg-background border border-muted rounded-xl p-4">
      {icon}
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm font-light mt-2">{description}</p>
      </div>
    </div>
  )
}
