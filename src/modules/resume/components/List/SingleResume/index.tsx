import { IconCopy, IconDownload, IconEdit, IconMaximize, IconTrash } from '@tabler/icons-react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import 'dayjs/locale/fa'
import jalaliday from 'jalaliday'
import React, { useEffect } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from '@/components/ui/navigation'
import { deleteResume, updateDownload, updateResumeTitle } from '@/modules/resume/service'
import { YekanBakhNumFont } from '@/styles/fonts'

import type { IResumeResponse } from '@/modules/resume/interface/resume'

dayjs.extend(jalaliday)

interface Props {
  resume: IResumeResponse
  onRefresh: () => void
}

const SingleResume: React.FC<Props> = ({ resume, onRefresh }) => {
  const { locale } = useParams()
  const t = useTranslations('Resume')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const [titleValue, setTitleValue] = React.useState(resume.title)
  const [isEditingTitle, setIsEditingTitle] = React.useState(false)

  const [removeLoading, setRemoveLoading] = React.useState(false)
  const [downloadLoading, setDownloadLoading] = React.useState(false)

  useEffect(() => {
    if (isEditingTitle) inputRef.current?.focus()
  }, [isEditingTitle])

  const onStartEdit = () => {
    setIsEditingTitle(true)
    setTitleValue(resume.title)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onFinishEdit()
    if (e.key === 'Escape') setIsEditingTitle(false)
  }

  const onFinishEdit = () => {
    setIsEditingTitle(false)
    if (titleValue !== resume.title) {
      updateResumeTitle(resume._id, titleValue).then(() => onRefresh())
    }
  }

  const onDownload = () => {
    if (resume.file) {
      setDownloadLoading(true)
      updateDownload(resume._id)
        .then((url) => {
          setDownloadLoading(false)
          window.open(url)
        })
        .catch(() => setDownloadLoading(false))
    }
  }

  const onDelete = () => {
    setRemoveLoading(true)
    deleteResume(resume._id)
      .then(() => {
        onRefresh()
        setRemoveLoading(false)
      })
      .catch(() => setRemoveLoading(false))
  }

  return (
    <div className="flex h-full flex-col gap-3 md:flex-row">
      <div className="relative mx-auto h-[150px] w-[190px] overflow-hidden rounded-md md:mx-0 md:h-[255px] md:w-[190px]">
        <iframe
          className="h-[360mm] w-[210mm]"
          referrerPolicy="no-referrer"
          src={`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/public/resume/${resume._id}`}
          style={{ transform: 'scale(0.24)', transformOrigin: locale === 'fa' ? '100% 0' : '0 0' }}
          title="Resume Preview"
        />

        <div
          className={clsx(
            'group absolute top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center',
            'cursor-pointer bg-transparent transition-all duration-200 ease-in-out hover:bg-black/40'
          )}
        >
          <Link
            className={clsx(
              '-translate-y-[150px] group-hover:translate-y-0',
              'flex h-10 w-10 items-center justify-center rounded-full bg-primary transition-all duration-200 ease-in-out'
            )}
            href={`/resume-preview/${resume._id}`}
            target="_blank"
          >
            <IconMaximize className="h-6 w-6 text-white" />
          </Link>
        </div>
      </div>

      <div className="flex h-full flex-1 flex-col items-center justify-between md:items-start">
        <div className="flex-1 space-y-2 text-center md:text-start">
          {isEditingTitle ? (
            <Input
              onBlur={onFinishEdit}
              onChange={(e) => setTitleValue(e.target.value)}
              onKeyDown={onKeyDown}
              ref={inputRef}
              value={titleValue}
            />
          ) : (
            <div className="text-lg" onClick={onStartEdit}>
              {titleValue}
            </div>
          )}

          <p className="text-gray-400 text-sm">
            <span>{t('Fields.CreatedAt')}</span>
            <span>:&nbsp;</span>
            <span className={locale === 'fa' ? YekanBakhNumFont.className : ''}>
              {dayjs(resume.createdAt)
                .locale(locale as string)
                .calendar(locale === 'fa' ? 'jalali' : 'gregory')
                .format(locale === 'fa' ? 'DD MMMM، HH:mm' : 'DD MMMM, HH:mm')}
            </span>
          </p>

          <p className="text-gray-400 text-sm">
            <span>{t('Fields.UpdatedAt')}</span>
            <span>:&nbsp;</span>
            <span className={locale === 'fa' ? YekanBakhNumFont.className : ''}>
              {dayjs(resume.updatedAt)
                .locale(locale as string)
                .calendar(locale === 'fa' ? 'jalali' : 'gregory')
                .format(locale === 'fa' ? 'DD MMMM، HH:mm' : 'DD MMMM, HH:mm')}
            </span>
          </p>
        </div>

        <div className="grid w-full grid-cols-12 gap-3 pt-3">
          <div className="col-span-6">
            <Link href={`/app/resume/${resume._id}`}>
              <Button className="flex w-full items-center justify-start gap-2" size="sm" variant="secondary">
                <IconEdit className="h-4 w-4" />
                {t('Fields.Edit')}
              </Button>
            </Link>
          </div>
          <div className="col-span-6">
            <Button className="flex w-full items-center justify-start gap-2" disabled size="sm" variant="secondary">
              <IconCopy className="h-4 w-4" />
              {t('Fields.Copy')}
            </Button>
          </div>
          <div className="col-span-6">
            <Button
              className="flex w-full items-center justify-start gap-2"
              loading={downloadLoading}
              onClick={onDownload}
              size="sm"
              variant="secondary"
            >
              <IconDownload className="h-4 w-4" />
              {t('Fields.Download')}
            </Button>
          </div>
          <div className="col-span-6">
            <AlertRemove loading={removeLoading} onDelete={onDelete} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleResume

const AlertRemove: React.FC<{ loading: boolean; onDelete: () => void }> = ({ loading, onDelete }) => {
  const t = useTranslations('Resume')

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="flex w-full items-center justify-start gap-2 border-destructive text-destructive"
          loading={loading}
          size="sm"
          variant="outline"
        >
          <IconTrash className="h-4 w-4" />
          {t('Fields.Delete')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('Delete.Title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('Delete.Description')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="ml-2">{t('Delete.Cancel')}</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive hover:bg-destructive/80" onClick={onDelete}>
            {t('Delete.Confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
