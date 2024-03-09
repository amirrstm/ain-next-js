import { useTranslations } from 'next-intl'

import {
  IconBolt,
  IconBrandBlogger,
  IconBrandGoogle,
  IconBrandInstagram,
  IconBrandX,
  IconBrandYoutube,
  IconCash,
  IconClick,
  IconClock,
  IconEaseInOutControlPoints,
  IconPencilHeart,
  IconSparkles,
  IconTextCaption,
  IconTopologyStar3,
} from '@tabler/icons-react'
import { IconSeo } from '@tabler/icons-react'
import clsx from 'clsx'
import React, { ReactNode } from 'react'

import { YekanBakhNumFont } from '@/styles/fonts'

const FEATURES = [
  <IconBrandGoogle className="w-6 h-6" />,
  <IconBrandInstagram className="w-6 h-6" />,
  <IconBrandYoutube className="w-6 h-6" />,
  <IconTextCaption className="w-6 h-6" />,
  <IconBrandBlogger className="w-6 h-6" />,
  <IconSeo className="w-6 h-6" />,
  <IconPencilHeart className="w-6 h-6" />,
]

const Benefits: React.FC = () => {
  const t = useTranslations('Layout.Home')

  return (
    <section className="relative">
      <div
        className={clsx(
          'absolute -top-10 left-0 right-0 h-1/2 bg-white bg-no-repeat bg-cover bg-top -z-[1]',
          'bg-[url("https://res.cloudinary.com/dwwcd5u9v/image/upload/v1708678667/images/banner.svg")]',
        )}
      />

      <div className="max-w-6xl mx-auto py-12 px-6 relative z-[1]">
        <div className="py-1 w-14 rounded-full bg-primary text-white flex justify-center text-xs shadow-xl shadow-primary tracking-widest">
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

      <div className="max-w-6xl mx-auto py-12 md:py-20 px-2 md:px-6 relative z-[1]">
        <div className="flex flex-col items-center">
          <div className="py-1 w-20 rounded-full bg-primary text-white flex justify-center text-xs shadow-xl shadow-primary tracking-widest">
            {t('Features.Title')}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold my-6 block  text-center">{t('Features.Subtitle')}</h1>

          <div className="flex gap-1 md:gap-4 my-2 md:my-6 transition-all duration-200 ease-in-out hover:scale-110">
            {FEATURES.map((icon, index) => (
              <div
                key={index}
                className="w-12 h-12 bg-secondary !text-white rounded-xl flex items-center justify-center shadow-xl"
              >
                {icon}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-3 border rounded-xl mt-6 md:p-2">
            <div className="col-span-12 md:col-span-4">
              <div className="flex flex-col gap-4 p-4">
                <p className={clsx(YekanBakhNumFont.className, 'text-3xl text-primary font-bold')}>1</p>
                <div>
                  <h2 className="text-2xl font-bold">{t('Features.First.Title')}</h2>
                  <p className="text-sm font-light mt-2">{t('Features.First.Description')}</p>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4">
              <div className="flex flex-col gap-4 p-4">
                <p className={clsx(YekanBakhNumFont.className, 'text-3xl text-primary font-bold')}>2</p>
                <div>
                  <h2 className="text-2xl font-bold">{t('Features.Second.Title')}</h2>
                  <p className="text-sm font-light mt-2">{t('Features.Second.Description')}</p>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4">
              <div className="flex flex-col gap-4 p-4">
                <p className={clsx(YekanBakhNumFont.className, 'text-3xl text-primary font-bold')}>3</p>
                <div>
                  <h2 className="text-2xl font-bold">{t('Features.Third.Title')}</h2>
                  <p className="text-sm font-light mt-2">{t('Features.Third.Description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits

const SingleBox: React.FC<{ title: string; description: string; icon: ReactNode }> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col gap-6 bg-white border rounded-xl p-4">
      {icon}
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm font-light mt-2">{description}</p>
      </div>
    </div>
  )
}
