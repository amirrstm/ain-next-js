import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

import useTemplates from '@/modules/resume/hooks/useTemplates'

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
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      scale: 0.8,
      zIndex: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      scale: 0.8,
      opacity: 0,
    }),
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex(prevIndex => (prevIndex - 1 + data.length) % data.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex(prevIndex => (prevIndex + 1) % data.length)
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
      <div className="relative w-[600px] h-[80vh] md:h-[450px] overflow-hidden flex items-center justify-center">
        <div
          onClick={handleNext}
          className="absolute w-1/3 cursor-pointer flex items-center justify-center z-[2] right-0 h-full bg-gradient-to-r from-background to-background/60"
        >
          <IconArrowRight className="w-10 h-10 ml-6" />
        </div>

        <div
          onClick={handlePrev}
          className="absolute w-1/3 cursor-pointer flex items-center justify-center z-[2] left-0 h-full bg-gradient-to-r from-background to-background/60"
        >
          <IconArrowLeft className="w-10 h-10 mr-6" />
        </div>

        <div className="absolute left-0 w-1/3 h-full flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={getPreviousIndex(currentIndex)}
              className="absolute"
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                scale: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <div className="w-[150px] h-1/3">
                <Image
                  width={150}
                  height={250}
                  className="rounded"
                  alt={getName(getPreviousIndex(currentIndex))}
                  src={getImage(getPreviousIndex(currentIndex))}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative w-[200px] md:w-[300px] h-full flex items-center justify-center z-10">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              className="absolute"
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                scale: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <div className="absolute -top-3 bg-neutral-500 px-6 py-0.5 rounded-md left-1/2 -translate-x-1/2 z-[2]">
                <p className="text-sm">{getName(currentIndex)}</p>
              </div>

              <div className="w-full h-full relative border-4 border-neutral-500 rounded-xl overflow-hidden">
                <Image width={320} height={450} alt={getName(currentIndex)} src={getImage(currentIndex)} />

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                  <Button size="sm" onClick={() => onSelect(data[currentIndex]._id)}>
                    {t('Select')}
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="absolute right-0 w-1/3 h-full flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={getNextIndex(currentIndex)}
              className="absolute"
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                scale: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <div className="w-[150px] h-1/3">
                <Image
                  width={150}
                  height={250}
                  className="rounded"
                  alt={getName(getNextIndex(currentIndex))}
                  src={getImage(getNextIndex(currentIndex))}
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
