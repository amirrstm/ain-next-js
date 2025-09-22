'use client'

import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretDownFilled,
  IconCaretLeftFilled,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconCommand,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconSearch,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconWorld
} from '@tabler/icons-react'
import { type MotionValue, motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'

import useWindowDimensions from '@/hooks/useWindowDimensions'
import IconLogoSmall from '@/icons/logos/logo-small'
import { cn } from '@/lib/utils'

import HeroHeader from '../Hero'

import type React from 'react'

export const MainScreen = ({ src }: { src?: string }) => {
  const { locale } = useParams()
  const t = useTranslations('Layout')
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const { height } = useWindowDimensions()
  const isMobile = useMediaQuery({ maxWidth: 764 })
  const { scrollYProgress } = useScroll({ offset: ['start start', 'end start'], target: ref })

  const rotate = useTransform(scrollYProgress, [0, 0.1], [-28, 0])
  const translate = useTransform(scrollYProgress, [0, 0.3], [0, isMobile ? height / 1.4 : height / 1.85])

  const boxOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const scaleX = useTransform(scrollYProgress, [0, 0.2], [1.2, isMobile ? 1.3 : height > 1100 ? 1.7 : 1.3])
  const scaleY = useTransform(scrollYProgress, [0, 0.2], [0.6, isMobile ? 1.3 : height > 1100 ? 1.7 : 1.3])

  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100])

  const firstTextOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1])
  const firstTextTransform = useTransform(scrollYProgress, [0.2, 0.35], [100, height > 1100 ? 200 : 0])

  const secondTextOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1])
  const secondTextTransform = useTransform(scrollYProgress, [0.35, 0.5], [-100, 0])

  return (
    <>
      <motion.div style={{ opacity: boxOpacity }}>
        <div
          className={cn(
            'fixed top-0 right-0 left-0 h-screen w-screen bg-[url("/images/hero-screen.svg")]',
            'z-[-10] bg-background bg-center bg-cover bg-no-repeat',
            resolvedTheme === 'light' && 'contrast-[1] grayscale hue-rotate-[180deg] invert'
          )}
        />
      </motion.div>

      <div
        className="relative flex flex-shrink-0 flex-col items-center justify-start overflow-hidden py-10 [perspective:800px]"
        dir="ltr"
        ref={ref}
        style={{ minHeight: isMobile ? height * 1.4 : height > 1100 ? height * 1.6 : height * 2 }}
      >
        <motion.div className="mb-20 md:mb-20" style={{ opacity: textOpacity, translateY: textTransform }}>
          <HeroHeader />
        </motion.div>

        <div className="-translate-y-[100px] relative z-[5] scale-50 md:translate-y-0 md:scale-100">
          <Lid rotate={rotate} scaleX={scaleX} scaleY={scaleY} src={src} translate={translate} />

          {/* Base area */}
          <div className="-z-10 relative h-[22rem] w-[33rem] rounded-2xl bg-gray-200 dark:bg-[#272729]">
            {/* above keyboard bar */}
            <div className="relative h-10 w-full">
              <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
            </div>

            <div className="relative flex">
              <div className="mx-auto h-full w-[10%] overflow-hidden">
                <SpeakerGrid />
              </div>
              <div className="mx-auto h-full w-[80%]">
                <Keypad />
              </div>
              <div className="mx-auto h-full w-[10%] overflow-hidden">
                <SpeakerGrid />
              </div>
            </div>

            <TrackPad />

            <div
              className="-bottom-10 absolute inset-x-0 z-50 w-full rounded-2xl bg-gradient-to-t from-background via-background to-transparent dark:bottom-0 dark:from-secondary dark:via-secondary"
              style={{ height: height > 1000 ? height * 0.3 : height * 0.6 }}
            ></div>

            <motion.div
              className="absolute bottom-8 z-[51] flex w-full flex-col items-center justify-center text-center md:bottom-32"
              style={{ opacity: firstTextOpacity, translateY: firstTextTransform }}
            >
              <h2 className="font-bold text-4xl md:text-2xl rtl:md:text-3xl">{t('Home.Subtitles.First.Title')}</h2>
              <p className="mt-4 text-neutral-500 text-xl leading-loose md:text-sm" dir={locale === 'fa' ? 'rtl' : 'ltr'}>
                {t('Home.Subtitles.First.Description')}
              </p>
            </motion.div>

            <motion.div
              className="absolute z-[51] flex w-full flex-col items-center justify-center text-center"
              style={{
                opacity: secondTextOpacity,
                top: isMobile ? height + 100 : height * 0.88,
                translateY: secondTextTransform
              }}
            >
              <h2 className="font-bold text-4xl md:text-2xl rtl:md:text-3x">{t('Home.Subtitles.Second.Title')}</h2>
              <p className="mt-4 text-neutral-500 text-xl leading-loose md:text-sm" dir={locale === 'fa' ? 'rtl' : 'ltr'}>
                {t('Home.Subtitles.Second.Description')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src
}: {
  src?: string
  scaleX: MotionValue<number>
  scaleY: MotionValue<number>
  rotate: MotionValue<number>
  translate: MotionValue<number>
}) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        className="relative h-[12rem] w-[33rem] rounded-2xl bg-[#010101] p-2"
        style={{
          transform: 'perspective(900px) rotateX(-25deg) translateZ(0px)',
          transformOrigin: 'bottom',
          transformStyle: 'preserve-3d'
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]"
          style={{ boxShadow: '0px 2px 0px 2px var(--neutral-900) inset' }}
        >
          <div className="h-10 w-10">
            <IconLogoSmall />
          </div>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 h-[19rem] w-[33rem] overflow-hidden rounded-2xl bg-[#010101] p-2"
        style={{
          rotateX: rotate,
          scaleX: scaleX,
          scaleY: scaleY,
          transformOrigin: 'top',
          transformStyle: 'preserve-3d',
          translateY: translate
        }}
      >
        <div className="absolute inset-0 rounded-lg bg-[#272729]" />
        <Image
          alt="ainevis-template"
          className="absolute inset-0 h-full w-full rounded-lg object-cover object-left-top"
          height={1400}
          priority
          src={src as string}
          width={1400}
        />
      </motion.div>
    </div>
  )
}

export const TrackPad = () => {
  return <div className="mx-auto my-1 h-32 w-[40%] rounded-xl" style={{ boxShadow: '0px 0px 1px 1px #00000020 inset' }} />
}

export const Keypad = () => {
  return (
    <div className="mx-1 h-full rounded-md bg-[#050505] p-1">
      {/* First Row */}
      <Row>
        <KBtn childrenClassName="items-start" className="w-10 items-end justify-start pb-[2px] pl-[4px]">
          esc
        </KBtn>
        <KBtn>
          <IconBrightnessDown className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F1</span>
        </KBtn>

        <KBtn>
          <IconBrightnessUp className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F2</span>
        </KBtn>
        <KBtn>
          <IconTable className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F3</span>
        </KBtn>
        <KBtn>
          <IconSearch className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F4</span>
        </KBtn>
        <KBtn>
          <IconMicrophone className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F5</span>
        </KBtn>
        <KBtn>
          <IconMoon className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F6</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackPrev className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F7</span>
        </KBtn>
        <KBtn>
          <IconPlayerSkipForward className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackNext className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconVolume3 className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F10</span>
        </KBtn>
        <KBtn>
          <IconVolume2 className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F11</span>
        </KBtn>
        <KBtn>
          <IconVolume className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F12</span>
        </KBtn>
        <KBtn>
          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-20% from-neutral-900 via-50% via-black to-95% to-neutral-900 p-px">
            <div className="h-full w-full rounded-full bg-black" />
          </div>
        </KBtn>
      </Row>

      {/* Second row */}
      <Row>
        <KBtn>
          <span className="block">~</span>
          <span className="mt-1 block">`</span>
        </KBtn>

        <KBtn>
          <span className="block">!</span>
          <span className="block">1</span>
        </KBtn>
        <KBtn>
          <span className="block">@</span>
          <span className="block">2</span>
        </KBtn>
        <KBtn>
          <span className="block">#</span>
          <span className="block">3</span>
        </KBtn>
        <KBtn>
          <span className="block">$</span>
          <span className="block">4</span>
        </KBtn>
        <KBtn>
          <span className="block">%</span>
          <span className="block">5</span>
        </KBtn>
        <KBtn>
          <span className="block">^</span>
          <span className="block">6</span>
        </KBtn>
        <KBtn>
          <span className="block">&</span>
          <span className="block">7</span>
        </KBtn>
        <KBtn>
          <span className="block">*</span>
          <span className="block">8</span>
        </KBtn>
        <KBtn>
          <span className="block">(</span>
          <span className="block">9</span>
        </KBtn>
        <KBtn>
          <span className="block">)</span>
          <span className="block">0</span>
        </KBtn>
        <KBtn>
          <span className="block">&mdash;</span>
          <span className="block">_</span>
        </KBtn>
        <KBtn>
          <span className="block">+</span>
          <span className="block"> = </span>
        </KBtn>
        <KBtn childrenClassName="items-end" className="w-10 items-end justify-end pr-[4px] pb-[2px]">
          delete
        </KBtn>
      </Row>

      {/* Third row */}
      <Row>
        <KBtn childrenClassName="items-start" className="w-10 items-end justify-start pb-[2px] pl-[4px]">
          tab
        </KBtn>
        <KBtn>
          <span className="block">Q</span>
        </KBtn>

        <KBtn>
          <span className="block">W</span>
        </KBtn>
        <KBtn>
          <span className="block">E</span>
        </KBtn>
        <KBtn>
          <span className="block">R</span>
        </KBtn>
        <KBtn>
          <span className="block">T</span>
        </KBtn>
        <KBtn>
          <span className="block">Y</span>
        </KBtn>
        <KBtn>
          <span className="block">U</span>
        </KBtn>
        <KBtn>
          <span className="block">I</span>
        </KBtn>
        <KBtn>
          <span className="block">O</span>
        </KBtn>
        <KBtn>
          <span className="block">P</span>
        </KBtn>
        <KBtn>
          <span className="block">{`{`}</span>
          <span className="block">{`[`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`}`}</span>
          <span className="block">{`]`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`|`}</span>
          <span className="block">{`\\`}</span>
        </KBtn>
      </Row>

      {/* Fourth Row */}
      <Row>
        <KBtn childrenClassName="items-start" className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]">
          caps lock
        </KBtn>
        <KBtn>
          <span className="block">A</span>
        </KBtn>

        <KBtn>
          <span className="block">S</span>
        </KBtn>
        <KBtn>
          <span className="block">D</span>
        </KBtn>
        <KBtn>
          <span className="block">F</span>
        </KBtn>
        <KBtn>
          <span className="block">G</span>
        </KBtn>
        <KBtn>
          <span className="block">H</span>
        </KBtn>
        <KBtn>
          <span className="block">J</span>
        </KBtn>
        <KBtn>
          <span className="block">K</span>
        </KBtn>
        <KBtn>
          <span className="block">L</span>
        </KBtn>
        <KBtn>
          <span className="block">{`:`}</span>
          <span className="block">{`;`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`"`}</span>
          <span className="block">{`'`}</span>
        </KBtn>
        <KBtn childrenClassName="items-end" className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]">
          return
        </KBtn>
      </Row>

      {/* Fifth Row */}
      <Row>
        <KBtn childrenClassName="items-start" className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]">
          shift
        </KBtn>
        <KBtn>
          <span className="block">Z</span>
        </KBtn>
        <KBtn>
          <span className="block">X</span>
        </KBtn>
        <KBtn>
          <span className="block">C</span>
        </KBtn>
        <KBtn>
          <span className="block">V</span>
        </KBtn>
        <KBtn>
          <span className="block">B</span>
        </KBtn>
        <KBtn>
          <span className="block">N</span>
        </KBtn>
        <KBtn>
          <span className="block">M</span>
        </KBtn>
        <KBtn>
          <span className="block">{`<`}</span>
          <span className="block">{`,`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`>`}</span>
          <span className="block">{`.`}</span>
        </KBtn>{' '}
        <KBtn>
          <span className="block">{`?`}</span>
          <span className="block">{`/`}</span>
        </KBtn>
        <KBtn childrenClassName="items-end" className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]">
          shift
        </KBtn>
      </Row>

      {/* sixth Row */}
      <Row>
        <KBtn childrenClassName="h-full justify-between py-[4px]" className="">
          <div className="flex w-full justify-end pr-1">
            <span className="block">fn</span>
          </div>
          <div className="flex w-full justify-start pl-1">
            <IconWorld className="h-[6px] w-[6px]" />
          </div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]" className="">
          <div className="flex w-full justify-end pr-1">
            <IconChevronUp className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">control</span>
          </div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]" className="">
          <div className="flex w-full justify-end pr-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]" className="w-8">
          <div className="flex w-full justify-end pr-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="w-[8.2rem]"></KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]" className="w-8">
          <div className="flex w-full justify-start pl-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]" className="">
          <div className="flex w-full justify-start pl-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
          <KBtn className="h-3 w-6">
            <IconCaretUpFilled className="h-[6px] w-[6px]" />
          </KBtn>
          <div className="flex">
            <KBtn className="h-3 w-6">
              <IconCaretLeftFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretDownFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretRightFilled className="h-[6px] w-[6px]" />
            </KBtn>
          </div>
        </div>
      </Row>
    </div>
  )
}

export const KBtn = ({
  className,
  children,
  childrenClassName,
  backlit = true
}: {
  className?: string
  children?: React.ReactNode
  childrenClassName?: string
  backlit?: boolean
}) => {
  return (
    <div className={cn('rounded-[4px] p-[0.5px]', backlit && 'bg-white/[0.2] shadow-white shadow-xl')}>
      <div
        className={cn('flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]', className)}
        style={{
          boxShadow: '0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset'
        }}
      >
        <div
          className={cn(
            'flex w-full flex-col items-center justify-center text-[5px] text-neutral-200',
            childrenClassName,
            backlit && 'text-white'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export const Row = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-[2px] flex w-full flex-shrink-0 gap-[2px]">{children}</div>
}

export const SpeakerGrid = () => {
  return (
    <div
      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
      style={{
        backgroundImage: 'radial-gradient(circle, #08080A 0.5px, transparent 0.5px)',
        backgroundSize: '3px 3px'
      }}
    ></div>
  )
}

export const OptionKey = ({ className }: { className: string }) => {
  return (
    <svg className={className} fill="none" id="icon" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect height="2" stroke="currentColor" strokeWidth={2} width="10" x="18" y="5" />
      <polygon points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 " stroke="currentColor" strokeWidth={2} />
      <rect className="st0" height="32" id="_Transparent_Rectangle_" stroke="none" width="32" />
    </svg>
  )
}
