import { useTranslations } from 'next-intl'
import Image from 'next/image'

import {
  IconBolt,
  IconBrandBlogger,
  IconBrandGoogle,
  IconBrandInstagram,
  IconBrandYoutube,
  IconCash,
  IconClick,
  IconClock,
  IconEaseInOutControlPoints,
  IconPencilHeart,
  IconSeo,
  IconSparkles,
  IconTextCaption,
} from '@tabler/icons-react'
import clsx from 'clsx'
import React, { ReactNode } from 'react'

import { Button } from '@/components/ui/button'

import { FEATURE_IMAGE } from '@/constants'

const FEATURES = [
  <IconBrandGoogle key={'google'} className="w-6 h-6" />,
  <IconBrandInstagram key={'instagram'} className="w-6 h-6" />,
  <IconBrandYoutube key={'youtube'} className="w-6 h-6" />,
  <IconTextCaption key={'caption'} className="w-6 h-6" />,
  <IconBrandBlogger key={'blog'} className="w-6 h-6" />,
  <IconSeo key={'seo'} className="w-6 h-6" />,
  <IconPencilHeart key={'pencil'} className="w-6 h-6" />,
]

const Features: React.FC = () => {
  const t = useTranslations('Layout.Home')

  return (
    <div className="max-w-6xl mx-auto py-12 md:py-20 px-2 md:px-6 relative z-[1]">
      <div className="flex flex-col items-center">
        <div className="py-1 w-20 rounded-full bg-primary text-white flex justify-center text-xs shadow-xl shadow-primary tracking-widest">
          {t('Features.Title')}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold my-6 block text-center">{t('Features.Subtitle')}</h1>

        <div className="flex gap-1 md:gap-4 my-2 md:my-6 transition-all duration-200 ease-in-out hover:scale-110">
          {FEATURES.map((icon, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-foreground !text-background rounded-xl flex items-center justify-center shadow-xl"
            >
              {icon}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6 mt-4 md:mt-0">
          <div className="col-span-12 md:col-span-6 md:order-1 order-2">
            <div className="border border-foreground/15 rounded-2xl p-6 flex flex-col">
              <div className="border border-primary bg-primary/10 w-fit px-5 p-3 rounded-full">
                <p className="text-primary text-sm">{t('Features.Help')}</p>
              </div>

              <div className="p-4 md:py-14">
                <ul className="list-disc leading-7 space-y-4">
                  <li>
                    <p>{t('Features.Description.First')}</p>
                  </li>
                  <li>
                    <p>{t('Features.Description.Second')}</p>
                  </li>
                  <li>
                    <p>{t('Features.Description.Third')}</p>
                  </li>
                  <li>
                    <p>{t('Features.Description.Fourth')}</p>
                  </li>
                  <li>
                    <p>{t('Features.Description.Fifth')}</p>
                  </li>
                </ul>
              </div>

              <div className="bg-primary p-4 rounded-3xl flex items-center justify-between gap-2 md:gap-6 md:flex-row flex-col md:text-start text-center">
                <div>
                  <p className="text-neutral-300 text-xs">{t('Features.Cta.Title')}</p>

                  <p className="text-xs mt-3 text-white dark:text-foreground">{t('Features.Cta.Description')}</p>
                </div>

                <Button className="bg-white hover:bg-white/80 text-foreground dark:text-black w-full md:w-auto">
                  <p>{t('Features.TryNow')}</p>
                </Button>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 md:order2 order-1">
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <Image alt="logo" width={800} height={800} src={FEATURE_IMAGE} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-11 gap-4 mt-6">
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
    </div>
  )
}

export default Features

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
