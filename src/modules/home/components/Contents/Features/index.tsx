import { useTranslations } from 'next-intl'

import {
  IconBrandBlogger,
  IconBrandGoogle,
  IconBrandInstagram,
  IconBrandYoutube,
  IconPencilHeart,
  IconSeo,
  IconTextCaption,
} from '@tabler/icons-react'
import clsx from 'clsx'
import React from 'react'

import { YekanBakhNumFont } from '@/styles/fonts'

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

        <div className="grid grid-cols-12 gap-3 border border-muted rounded-xl mt-6 md:p-2 bg-background">
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
  )
}

export default Features
