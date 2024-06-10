'use client'

import { useTranslations } from 'next-intl'

import { IconClipboardText, IconOctagonPlus } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { Button } from '@/components/ui/button'

import IconResume from '@/icons/menus/resume'

import CreateResume from '../../components/Create'
import ResumeEmpty from '../../components/List/Empty'
import SingleResume from '../../components/List/SingleResume'
import ResumeSkelton from '../../components/List/SingleResume/Skelton'
import useResumes from '../../hooks/useResumes'

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
      <div className="md:p-6 px-0 py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12">
              <IconResume />
            </div>
            <div>
              <p className="md:text-lg">{t('Title')}</p>
              <p className="text-xs text-gray-500 mt-1">{t('Description')}</p>
            </div>
          </div>

          {data && data.length > 0 && (
            <Button size={isMobile ? 'sm' : 'default'} className="flex gap-2 items-center" onClick={onCreate}>
              <IconOctagonPlus className="w-5 h-5" />
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
              {data.map(resume => (
                <div key={resume._id} className="col-span-12 xl:col-span-6 border border-muted p-4 rounded-md">
                  <SingleResume resume={resume} onRefresh={refreshResumes} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* <div className="bg-background md:border md:rounded-xl md:border-muted md:shadow-sm">
          <div className="p-4 border-b border-b-muted flex items-center justify-between">
            <p className="text-xs md:text-sm">{t('List')}</p>

            {data && data.length > 0 && (
              <Button size={isMobile ? 'sm' : 'default'} className="flex gap-2 items-center" onClick={onCreate}>
                <IconOctagonPlus className="w-5 h-5" />
                {t('Create.Title')}
              </Button>
            )}
          </div>
          <div className="p-4 min-h-[600px]"></div>
        </div> */}
      </div>

      <CreateResume open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  )
}

export default ResumeListContainer
