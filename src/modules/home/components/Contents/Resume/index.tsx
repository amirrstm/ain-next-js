import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
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

import type React from 'react'
import type { ReactNode } from 'react'

const textGradient = 'from-primary to-textWhite bg-gradient-to-r bg-clip-text text-transparent'

const Resume: React.FC = () => {
  const { locale } = useParams()
  const t = useTranslations('Layout.Home')
  const isMobile = useMediaQuery({ maxWidth: 1280 })

  return (
    <div className="mx-auto max-w-6xl px-2 py-12 md:px-6 md:py-20">
      <div className="flex flex-col items-center">
        <div className="flex w-32 justify-center rounded-full bg-primary py-2 text-white text-xs tracking-widest shadow-primary shadow-xl rtl:w-24 dark:text-foreground">
          {t('Resume.Title')}
        </div>

        <h1 className="my-6 block font-bold text-2xl md:text-4xl">{t('Resume.Description')}</h1>
      </div>

      <div className="grid grid-cols-12 gap-2 md:mt-12 md:gap-4">
        <div className="col-span-12 xl:col-span-5">
          <div className="flex flex-col space-y-2 md:space-y-4">
            <SingleBox>
              <div className="flex flex-col p-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8">
                    <MicIcon />
                  </div>

                  <p className="text-accent/60 text-sm">{t('Resume.Voice.Topic')}</p>
                </div>

                <div className="pt-8">
                  <h2 className={clsx('font-bold text-2xl xl:text-3xl', textGradient)}>{t('Resume.Voice.Title')}</h2>

                  <div
                    className="mt-6 text-sm leading-loose"
                    dangerouslySetInnerHTML={{ __html: t('Resume.Voice.Description') }}
                  />
                </div>

                <div className="px-4 pt-8 pb-7">
                  <div className="flex items-center justify-center rounded-xl bg-black p-4">
                    <IconVoice />
                  </div>
                </div>
              </div>
            </SingleBox>

            <div className="grid grid-cols-12 gap-2 xl:gap-4">
              <div className="col-span-6 md:col-span-6 xl:col-span-6">
                <SingleBox>
                  <div className="flex flex-col">
                    <div className="p-4">
                      <RoundedBtn>
                        <IconProfile />
                      </RoundedBtn>

                      <h2 className={clsx('mt-4 font-medium', textGradient)}>{t('Resume.Introduce.Title')}</h2>

                      <p className="mt-3 text-xs leading-5">{t('Resume.Introduce.Description')}</p>
                    </div>
                  </div>
                </SingleBox>
              </div>

              <div className="col-span-6 md:col-span-6 xl:col-span-6">
                <SingleBox>
                  <div className="relative flex flex-col md:h-[200px] xl:h-auto">
                    <div className="p-3">
                      <div className="flex items-center gap-1">
                        <div className="h-8 w-8">
                          <IconTick />
                        </div>

                        <p className="mb-1 text-accent/60 text-xs">{t('Resume.ATS.Topic')}</p>
                      </div>
                    </div>

                    <div className="-translate-x-1/2 absolute top-6 left-1/2 w-[200px]">
                      <div className="-translate-x-1/2 absolute bottom-10 left-1/2 max-w-[90px] text-center rtl:bottom-14">
                        <p className={clsx('font-medium text-2xl leading-relaxed', textGradient)}>
                          {locale === 'fa' ? '۱۵۰%+' : '150%'}
                        </p>
                        <p className={clsx('font-medium text-xs leading-relaxed', textGradient)}>{t('Resume.ATS.Description')}</p>
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
                        <div className="h-8 w-8">
                          <IconArrowUp />
                        </div>

                        <p className="mb-1 text-accent/60 text-xs">{t('Resume.Structure.Topic')}</p>
                      </div>

                      <h2 className={clsx('font-medium text-sm leading-relaxed', textGradient)}>
                        {t('Resume.Structure.Title', { percent: locale === 'fa' ? '۳۰۰%+' : '300%' })}
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
                <div className="flex flex-col gap-3 p-6 md:flex-row">
                  <RoundedBtn>
                    <IconNote />
                  </RoundedBtn>

                  <div className="flex-1">
                    <h2 className={clsx('font-medium leading-relaxed', textGradient)}>{t('Resume.Suggest.Title')}</h2>

                    <p className="mt-3 text-xs leading-relaxed">{t('Resume.Suggest.Description')}</p>
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

                    <h2 className={clsx('mt-4 font-medium', textGradient)}>{t('Resume.Project.Title')}</h2>

                    <p className="mt-3 text-xs leading-5">{t('Resume.Project.Description')}</p>
                  </div>
                </div>
              </SingleBox>
            </div>

            <div className="col-span-6 md:col-span-4">
              <div className="relative h-full rounded-2xl bg-primary/80 px-5 py-6">
                <div className="absolute bottom-2 left-2 opacity-70">
                  <IconWand />
                </div>
                <h2 className={clsx('font-bold text-white text-xl dark:text-foreground')}>{t('Resume.Principle.Title')}</h2>

                <p className="mt-4 text-white text-xs leading-relaxed dark:text-foreground">
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

                    <h2 className={clsx('mt-4 font-medium', textGradient)}>{t('Resume.Template.Title')}</h2>

                    <p className="mt-3 text-xs leading-5">{t('Resume.Template.Description')}</p>
                  </div>
                </div>
              </SingleBox>
            </div>

            {isMobile && (
              <div className="col-span-6 md:col-span-4">
                <SingleBox>
                  <div className="flex flex-col">
                    <div className="p-3">
                      <div className="flex items-center gap-1 pb-2">
                        <div className="h-8 w-8">
                          <IconArrowUp />
                        </div>

                        <p className="mb-1 text-accent/60 text-xs">{t('Resume.Structure.Topic')}</p>
                      </div>

                      <h2 className={clsx('font-medium text-sm leading-relaxed', textGradient)}>
                        {t('Resume.Structure.Title', { percent: locale === 'fa' ? '۳۰۰%+' : '300%' })}
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
                <div className="flex flex-col gap-3 p-6 md:flex-row">
                  <RoundedBtn>
                    <IconFirstLine />
                  </RoundedBtn>

                  <div className="flex-1">
                    <h2 className={clsx('font-medium leading-relaxed', textGradient)}>{t('Resume.Writing.Title')}</h2>

                    <p className="mt-3 text-xs leading-relaxed">{t('Resume.Writing.Description')}</p>
                  </div>
                </div>
              </SingleBox>
            </div>

            <div className="col-span-12 md:col-span-4">
              <SingleBox>
                <div className="flex flex-col">
                  <div className="p-3">
                    <div className="flex items-center gap-1 pb-2">
                      <div className="h-8 w-8">
                        <IconFlag />
                      </div>

                      <p className="mb-1 text-accent/60 text-xs">{t('Resume.Satisfy.Topic')}</p>
                    </div>

                    <h2 className={clsx('font-medium leading-relaxed', textGradient)}>
                      {t('Resume.Satisfy.Title', { number: locale === 'fa' ? '۱۵۰' : '150' })}
                    </h2>
                  </div>

                  <div className="py-3">
                    <IconMilestone />

                    <p className="mt-2 text-center text-[10px] text-gray-400">{t('Resume.Satisfy.Description')}</p>
                  </div>
                </div>
              </SingleBox>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Link href={'/app/resume'}>
          <Button className="gap-2 rounded-full px-8">{t('Resume.Button')}</Button>
        </Link>
      </div>
    </div>
  )
}

export default Resume

const SingleBox: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={clsx('h-full rounded-2xl border border-foreground/15', className)}>{children}</div>
}

const RoundedBtn: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black">{children}</div>
}
