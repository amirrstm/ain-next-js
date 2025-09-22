import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import useTemplates from '@/modules/resume/hooks/useTemplates'

import type React from 'react'

interface Props {
  onSelect: (id: string) => void
}

const ResumeTemplates: React.FC<Props> = ({ onSelect }) => {
  const t = useTranslations('Resume.Create.Template')
  const { isLoading, data } = useTemplates()

  const [direction, setDirection] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(1)

  if (isLoading || !data) {
    return null
  }

  const variants = {
    center: {
      scale: 1,
      x: 0,
      zIndex: 1
    },
    enter: (direction: number) => ({
      scale: 0.8,
      x: direction > 0 ? 300 : -300,
      zIndex: 0
    }),
    exit: (direction: number) => ({
      opacity: 0,
      scale: 0.8,
      x: direction < 0 ? 300 : -300,
      zIndex: 0
    })
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length)
  }

  const getImage = (index: number) => {
    return data[index].image
  }

  const getName = (index: number) => {
    return data[index].name
  }

  const getPreviousIndex = (index: number) => (index - 1 + data.length) % data.length
  const getNextIndex = (index: number) => (index + 1) % data.length

  return (
    <div className="flex items-center justify-center space-x-4 py-8">
      <div className="relative flex h-[80vh] w-[600px] items-center justify-center overflow-hidden md:h-[500px]">
        <div
          className="absolute right-0 z-[2] flex h-full w-1/3 cursor-pointer items-center justify-center bg-gradient-to-r from-background to-background/60"
          onClick={handleNext}
        >
          <IconArrowRight className="ml-6 h-10 w-10" />
        </div>

        <div
          className="absolute left-0 z-[2] flex h-full w-1/3 cursor-pointer items-center justify-center bg-gradient-to-r from-background to-background/60"
          onClick={handlePrev}
        >
          <IconArrowLeft className="mr-6 h-10 w-10" />
        </div>

        <div className="absolute left-0 flex h-full w-1/3 items-center justify-center">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              animate="center"
              className="absolute"
              custom={direction}
              exit="exit"
              initial="enter"
              key={getPreviousIndex(currentIndex)}
              transition={{
                opacity: { duration: 0.2 },
                scale: { damping: 30, stiffness: 300, type: 'spring' },
                x: { damping: 30, stiffness: 300, type: 'spring' }
              }}
              variants={variants}
            >
              <div className="h-1/3 w-[150px]">
                <Image
                  alt={getName(getPreviousIndex(currentIndex))}
                  className="rounded"
                  height={250}
                  src={getImage(getPreviousIndex(currentIndex))}
                  width={150}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div
          className="relative z-10 flex h-full w-[200px] cursor-pointer items-center justify-center md:w-[300px]"
          onClick={() => onSelect(data[currentIndex]._id)}
        >
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              animate="center"
              className="absolute"
              custom={direction}
              exit="exit"
              initial="enter"
              key={currentIndex}
              transition={{
                opacity: { duration: 0.2 },
                scale: { damping: 30, stiffness: 300, type: 'spring' },
                x: { damping: 30, stiffness: 300, type: 'spring' }
              }}
              variants={variants}
            >
              <div className="-top-3 -translate-x-1/2 absolute left-1/2 z-[2] rounded-md bg-neutral-200 px-6 py-0.5 dark:bg-neutral-500">
                <p className="text-sm">{getName(currentIndex)}</p>
              </div>

              <div className="relative h-full w-full overflow-hidden rounded-xl border-4 border-neutral-200 dark:border-neutral-500">
                <Image alt={getName(currentIndex)} height={450} src={getImage(currentIndex)} width={320} />
              </div>

              <div className="-bottom-12 -translate-x-1/2 absolute left-1/2">
                <Button onClick={() => onSelect(data[currentIndex]._id)} size="sm">
                  {t('Select')}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="absolute right-0 flex h-full w-1/3 items-center justify-center">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              animate="center"
              className="absolute"
              custom={direction}
              exit="exit"
              initial="enter"
              key={getNextIndex(currentIndex)}
              transition={{
                opacity: { duration: 0.2 },
                scale: { damping: 30, stiffness: 300, type: 'spring' },
                x: { damping: 30, stiffness: 300, type: 'spring' }
              }}
              variants={variants}
            >
              <div className="h-1/3 w-[150px]">
                <Image
                  alt={getName(getNextIndex(currentIndex))}
                  className="rounded"
                  height={250}
                  src={getImage(getNextIndex(currentIndex))}
                  width={150}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ResumeTemplates
