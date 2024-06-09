import { useTranslations } from 'next-intl'

import clsx from 'clsx'
import React, { ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'

import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/navigation'

import IconArrowUp from '@/icons/resume/arrow-up'
import IconFirstLine from '@/icons/resume/first-line'
import IconFlag from '@/icons/resume/flag'
import IconMedal from '@/icons/resume/medal'
import MicIcon from '@/icons/resume/mic'
import IconMilestone from '@/icons/resume/milestone'
import IconNote from '@/icons/resume/note'
import IconProfile from '@/icons/resume/profile'
import IconProgress from '@/icons/resume/progress'
import IconRaise from '@/icons/resume/raise'
import IconTemplate from '@/icons/resume/template'
import IconTick from '@/icons/resume/tick'
import IconVoice from '@/icons/resume/voice'
import IconWand from '@/icons/resume/wand'

const textGradient = 'from-primary to-textWhite bg-gradient-to-r bg-clip-text text-transparent'

const Resume: React.FC = () => {
  const t = useTranslations('Layout.Home')
  const isMobile = useMediaQuery({ maxWidth: 1280 })

  return (
    <div className="max-w-6xl mx-auto py-12 md:py-20 px-2 md:px-6">
      <div className="flex flex-col items-center">
        <div className="py-2 w-24 rounded-full bg-primary text-white dark:text-foreground flex justify-center text-xs shadow-xl shadow-primary tracking-widest">
          {t('Resume.Title')}
        </div>

        <h1 className="text-2xl md:text-4xl font-bold my-6 block">{t('Resume.Description')}</h1>
      </div>

      <div className="grid grid-cols-12 gap-2 md:gap-4 md:mt-12">
        <div className="col-span-12 xl:col-span-5">
          <div className="md:space-y-4 space-y-2 flex flex-col">
            <SingleBox>
              <div className="flex flex-col p-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8">
                    <MicIcon />
                  </div>

                  <p className="text-sm text-accent/60">{t('Resume.Voice.Topic')}</p>
                </div>

                <div className="pt-8">
                  <h2 className={clsx('text-2xl xl:text-3xl font-bold', textGradient)}>{t('Resume.Voice.Title')}</h2>

                  <div
                    className="mt-6 text-sm leading-loose"
                    dangerouslySetInnerHTML={{ __html: t('Resume.Voice.Description') }}
                  />
                </div>

                <div className="px-4 pt-8 pb-7">
                  <div className="bg-black p-4 rounded-xl flex items-center justify-center">
                    <IconVoice />
                  </div>
                </div>
              </div>
            </SingleBox>

            <div className="grid grid-cols-12 gap-2 xl:gap-4">
              <div className="xl:col-span-6 md:col-span-6 col-span-6">
                <SingleBox>
                  <div className="flex flex-col">
                    <div className="p-4">
                      <RoundedBtn>
                        <IconProfile />
                      </RoundedBtn>

                      <h2 className={clsx('font-medium mt-4', textGradient)}>{t('Resume.Introduce.Title')}</h2>

                      <p className="text-xs mt-3 leading-5">{t('Resume.Introduce.Description')}</p>
                    </div>
                  </div>
                </SingleBox>
              </div>

              <div className="xl:col-span-6 md:col-span-6 col-span-6">
                <SingleBox>
                  <div className="flex flex-col relative xl:h-auto md:h-[200px]">
                    <div className="p-3">
                      <div className="flex items-center gap-1">
                        <div className="w-8 h-8">
                          <IconTick />
                        </div>

                        <p className="text-xs text-accent/60 mb-1">{t('Resume.ATS.Topic')}</p>
                      </div>
                    </div>

                    <div className="w-[200px] top-6 left-1/2 -translate-x-1/2 absolute">
                      <div className="absolute left-1/2 text-center -translate-x-1/2 max-w-[90px] bottom-14">
                        <p className={clsx('font-medium text-2xl leading-relaxed', textGradient)}>{'۱۵۰%+'}</p>
                        <p className={clsx('font-medium text-xs leading-relaxed', textGradient)}>
                          {t('Resume.ATS.Description')}
                        </p>
                      </div>
                      <IconProgress />
                    </div>
                  </div>
                </SingleBox>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-7">
          <div className="grid grid-cols-12 gap-2 xl:gap-4">
            {!isMobile && (
              <div className="col-span-4">
                <SingleBox>
                  <div className="flex flex-col">
                    <div className="p-3">
                      <div className="flex items-center gap-1 pb-2">
                        <div className="w-8 h-8">
                          <IconArrowUp />
                        </div>

                        <p className="text-xs text-accent/60 mb-1">{t('Resume.Structure.Topic')}</p>
                      </div>

                      <h2 className={clsx('font-medium text-sm leading-relaxed', textGradient)}>
                        {t('Resume.Structure.Title', { percent: '۳۰۰%+' })}
                      </h2>
                    </div>

                    <div className="overflow-hidden pb-4">
                      <IconRaise />
                    </div>
                  </div>
                </SingleBox>
              </div>
            )}

            <div className="col-span-12 md:col-span-8">
              <SingleBox>
                <div className="p-6 flex flex-col md:flex-row gap-3">
                  <RoundedBtn>
                    <IconNote />
                  </RoundedBtn>

                  <div className="flex-1">
                    <h2 className={clsx('font-medium leading-relaxed', textGradient)}>{t('Resume.Suggest.Title')}</h2>

                    <p className="text-xs mt-3 leading-relaxed">{t('Resume.Suggest.Description')}</p>
                  </div>
                </div>
              </SingleBox>
            </div>

            <div className="col-span-6 md:col-span-4">
              <SingleBox>
                <div className="flex flex-col">
                  <div className="p-4">
                    <RoundedBtn>
                      <IconMedal />
                    </RoundedBtn>

                    <h2 className={clsx('font-medium mt-4', textGradient)}>{t('Resume.Project.Title')}</h2>

                    <p className="text-xs mt-3 leading-5">{t('Resume.Project.Description')}</p>
                  </div>
                </div>
              </SingleBox>
            </div>

            <div className="col-span-6 md:col-span-4">
              <div className="bg-primary/80 px-5 py-6 h-full rounded-2xl relative">
                <div className="absolute bottom-2 left-2 opacity-70">
                  <IconWand />
                </div>
                <h2 className={clsx('font-bold text-xl text-white dark:text-foreground')}>
                  {t('Resume.Principle.Title')}
                </h2>

                <p className="text-xs mt-4 leading-relaxed text-white dark:text-foreground">
                  {t('Resume.Principle.Description')}
                </p>
              </div>
            </div>

            <div className="col-span-6 md:col-span-4">
              <SingleBox>
                <div className="flex flex-col">
                  <div className="p-4">
                    <RoundedBtn>
                      <IconTemplate />
                    </RoundedBtn>

                    <h2 className={clsx('font-medium mt-4', textGradient)}>{t('Resume.Template.Title')}</h2>

                    <p className="text-xs mt-3 leading-5">{t('Resume.Template.Description')}</p>
                  </div>
                </div>
              </SingleBox>
            </div>

            {isMobile && (
              <div className="md:col-span-4 col-span-6">
                <SingleBox>
                  <div className="flex flex-col">
                    <div className="p-3">
                      <div className="flex items-center gap-1 pb-2">
                        <div className="w-8 h-8">
                          <IconArrowUp />
                        </div>

                        <p className="text-xs text-accent/60 mb-1">{t('Resume.Structure.Topic')}</p>
                      </div>

                      <h2 className={clsx('font-medium text-sm leading-relaxed', textGradient)}>
                        {t('Resume.Structure.Title', { percent: '۳۰۰%+' })}
                      </h2>
                    </div>

                    <div className="overflow-hidden pb-4">
                      <IconRaise />
                    </div>
                  </div>
                </SingleBox>
              </div>
            )}

            <div className="col-span-12 md:col-span-8">
              <SingleBox>
                <div className="p-6 flex flex-col md:flex-row gap-3">
                  <RoundedBtn>
                    <IconFirstLine />
                  </RoundedBtn>

                  <div className="flex-1">
                    <h2 className={clsx('font-medium leading-relaxed', textGradient)}>{t('Resume.Writing.Title')}</h2>

                    <p className="text-xs mt-3 leading-relaxed">{t('Resume.Writing.Description')}</p>
                  </div>
                </div>
              </SingleBox>
            </div>

            <div className="col-span-12 md:col-span-4">
              <SingleBox>
                <div className="flex flex-col">
                  <div className="p-3">
                    <div className="flex items-center gap-1 pb-2">
                      <div className="w-8 h-8">
                        <IconFlag />
                      </div>

                      <p className="text-xs text-accent/60 mb-1">{t('Resume.Satisfy.Topic')}</p>
                    </div>

                    <h2 className={clsx('font-medium leading-relaxed', textGradient)}>
                      {t('Resume.Satisfy.Title', { number: '۱۵۰' })}
                    </h2>
                  </div>

                  <div className="py-3">
                    <IconMilestone />

                    <p className="text-[10px] text-center mt-2 text-gray-400">{t('Resume.Satisfy.Description')}</p>
                  </div>
                </div>
              </SingleBox>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <Link href={'/app/resume'}>
          <Button className="rounded-full px-8 gap-2">{t('Resume.Button')}</Button>
        </Link>
      </div>
    </div>
  )
}

export default Resume

const SingleBox: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={clsx('border border-foreground/15 rounded-2xl h-full', className)}>{children}</div>
}

const RoundedBtn: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex justify-center items-center w-14 h-14 bg-black rounded-full">{children}</div>
}
