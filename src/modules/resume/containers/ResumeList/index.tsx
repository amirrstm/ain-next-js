'use client'

import { IconOctagonPlus } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { Button } from '@/components/ui/button'
import IconResume from '@/icons/menus/resume'

import CreateResume from '../../components/Create'
import ResumeEmpty from '../../components/List/Empty'
import SingleResume from '../../components/List/SingleResume'
import ResumeSkelton from '../../components/List/SingleResume/Skelton'
import useResumes from '../../hooks/useResumes'

import type React from 'react'

const ResumeListContainer: React.FC = () => {
  const t = useTranslations('Resume')
  const isMobile = useMediaQuery({ maxWidth: 764 })
  const [resumeOpen, setResumeOpen] = useState(false)

  const { data, isLoading, mutate: refreshResumes } = useResumes()

  const onCreate = () => {
    setResumeOpen(true)
  }

  return (
    <>
      <div className="px-0 py-4 md:p-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="h-12 w-12">
              <IconResume />
            </div>
            <div>
              <p className="md:text-lg">{t('Title')}</p>
              <p className="mt-1 text-gray-500 text-xs">{t('Description')}</p>
            </div>
          </div>

          {data && data.length > 0 && (
            <Button className="flex items-center gap-2" onClick={onCreate} size={isMobile ? 'sm' : 'default'}>
              <IconOctagonPlus className="h-5 w-5" />
              {t('Create.Title')}
            </Button>
          )}
        </div>

        <div className="py-8">
          {isLoading ? (
            <ResumeSkelton />
          ) : !data || data.length === 0 ? (
            <ResumeEmpty onCreate={onCreate} />
          ) : (
            <div className="grid grid-cols-12 gap-4">
              {data.map((resume) => (
                <div className="col-span-12 rounded-md border border-muted p-4 xl:col-span-6" key={resume._id}>
                  <SingleResume onRefresh={refreshResumes} resume={resume} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateResume onClose={() => setResumeOpen(false)} open={resumeOpen} />
    </>
  )
}

export default ResumeListContainer
