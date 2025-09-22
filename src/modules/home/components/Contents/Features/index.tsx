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
  IconTextCaption
} from '@tabler/icons-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { FEATURE_IMAGE } from '@/constants'

import type React from 'react'
import type { ReactNode } from 'react'

const FEATURES = [
  <IconBrandGoogle className="h-6 w-6" key={'google'} />,
  <IconBrandInstagram className="h-6 w-6" key={'instagram'} />,
  <IconBrandYoutube className="h-6 w-6" key={'youtube'} />,
  <IconTextCaption className="h-6 w-6" key={'caption'} />,
  <IconBrandBlogger className="h-6 w-6" key={'blog'} />,
  <IconSeo className="h-6 w-6" key={'seo'} />,
  <IconPencilHeart className="h-6 w-6" key={'pencil'} />
]

const Features: React.FC = () => {
  const t = useTranslations('Layout.Home')

  return (
    <div className="relative z-[1] mx-auto max-w-6xl px-2 py-12 md:px-6 md:py-20">
      <div className="flex flex-col items-center">
        <div className="flex w-20 justify-center rounded-full bg-primary py-1 text-white text-xs tracking-widest shadow-primary shadow-xl">
          {t('Features.Title')}
        </div>

        <h1 className="my-6 block text-center font-bold text-3xl md:text-4xl">{t('Features.Subtitle')}</h1>

        <div className="my-2 flex gap-1 transition-all duration-200 ease-in-out hover:scale-110 md:my-6 md:gap-4">
          {FEATURES.map((icon, index) => (
            <div
              className="!text-background flex h-12 w-12 items-center justify-center rounded-xl bg-foreground shadow-xl"
              key={index}
            >
              {icon}
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-12 gap-6 md:mt-0">
          <div className="order-2 col-span-12 md:order-1 md:col-span-6">
            <div className="flex flex-col rounded-2xl border border-foreground/15 p-6">
              <div className="w-fit rounded-full border border-primary bg-primary/10 p-3 px-5">
                <p className="text-primary text-sm">{t('Features.Help')}</p>
              </div>

              <div className="p-4 md:py-14">
                <ul className="list-disc space-y-4 leading-7">
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

              <div className="flex flex-col items-center justify-between gap-2 rounded-3xl bg-primary p-4 text-center md:flex-row md:gap-6 md:text-start">
                <div>
                  <p className="text-neutral-300 text-xs">{t('Features.Cta.Title')}</p>

                  <p className="mt-3 text-white text-xs dark:text-foreground">{t('Features.Cta.Description')}</p>
                </div>

                <Button className="w-full bg-white text-foreground hover:bg-white/80 md:w-auto dark:text-black">
                  <p>{t('Features.TryNow')}</p>
                </Button>
              </div>
            </div>
          </div>

          <div className="md:order2 order-1 col-span-12 md:col-span-6">
            <div className="h-full w-full overflow-hidden rounded-2xl">
              <Image alt="logo" className="h-full w-full object-cover" height={800} src={FEATURE_IMAGE} width={800} />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-11 gap-4">
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
    </div>
  )
}

export default Features

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
