import { useTranslations } from 'next-intl'

import { IconCopy, IconDownload, IconEdit, IconMaximize, IconTrash } from '@tabler/icons-react'
import clsx from 'clsx'
import dayjs from 'dayjs'
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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from '@/components/ui/navigation'

import { IResumeResponse } from '@/modules/resume/interface/resume'
import { deleteResume, updateDownload, updateResumeTitle } from '@/modules/resume/service'
import { YekanBakhNumFont } from '@/styles/fonts'

interface Props {
  resume: IResumeResponse
  onRefresh: () => void
}

dayjs.locale('fa')
dayjs.extend(jalaliday)

const SingleResume: React.FC<Props> = ({ resume, onRefresh }) => {
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
        .then(url => {
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
    <div className="flex flex-col md:flex-row gap-3 h-full">
      <div className="h-[150px] md:h-[255px] w-[190px] md:w-[190px] overflow-hidden rounded-md relative mx-auto md:mx-0">
        <iframe
          referrerPolicy="no-referrer"
          className="w-[210mm] h-[360mm]"
          style={{ transform: 'scale(0.24)', transformOrigin: '100% 0' }}
          src={`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/public/resume/${resume._id}`}
        />

        <div
          className={clsx(
            'group absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center',
            'bg-transparent transition-all duration-200 ease-in-out hover:bg-black/40 cursor-pointer',
          )}
        >
          <Link
            target="_blank"
            href={`/resume-preview/${resume._id}`}
            className={clsx(
              '-translate-y-[150px] group-hover:translate-y-0',
              'bg-primary w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out',
            )}
          >
            <IconMaximize className="w-6 h-6 text-white" />
          </Link>
        </div>
      </div>

      <div className="h-full flex flex-col justify-between items-center md:items-start flex-1">
        <div className="space-y-2 flex-1 text-center md:text-start">
          {isEditingTitle ? (
            <Input
              ref={inputRef}
              value={titleValue}
              onBlur={onFinishEdit}
              onKeyDown={onKeyDown}
              onChange={e => setTitleValue(e.target.value)}
            />
          ) : (
            <div className="text-lg" onClick={onStartEdit}>
              {titleValue}
            </div>
          )}

          <p className="text-sm text-gray-400">
            <span>{t('Fields.CreatedAt')}</span>
            <span>:&nbsp;</span>
            <span className={YekanBakhNumFont.className}>
              {dayjs(resume.createdAt).calendar('jalali').format('DD MMMM، HH:mm')}
            </span>
          </p>

          <p className="text-sm text-gray-400">
            <span>{t('Fields.UpdatedAt')}</span>
            <span>:&nbsp;</span>
            <span className={YekanBakhNumFont.className}>
              {dayjs(resume.updatedAt).calendar('jalali').format('DD MMMM، HH:mm')}
            </span>
          </p>
        </div>

        <div className="gap-3 pt-3 grid grid-cols-12 w-full">
          <div className="col-span-6">
            <Link href={`/app/resume/${resume._id}`}>
              <Button size="sm" variant="secondary" className="flex gap-1 items-center w-full">
                <IconEdit className="w-4 h-4" />
                {t('Fields.Edit')}
              </Button>
            </Link>
          </div>
          <div className="col-span-6">
            <Button size="sm" disabled variant="secondary" className="flex gap-1 items-center w-full">
              <IconCopy className="w-4 h-4" />
              {t('Fields.Copy')}
            </Button>
          </div>
          <div className="col-span-6">
            <Button
              size="sm"
              variant="secondary"
              onClick={onDownload}
              loading={downloadLoading}
              className="flex gap-1 items-center w-full"
            >
              <IconDownload className="w-4 h-4" />
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
          size="sm"
          loading={loading}
          variant="outline"
          className="flex gap-1 items-center w-full text-destructive border-destructive"
        >
          <IconTrash className="w-4 h-4" />
          {t('Fields.Delete')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>آیا از پاک کردن رزومه اطمینان دارید؟</AlertDialogTitle>
          <AlertDialogDescription>
            این عمل برگشت پذیر نیست، و تمام فایل ها و عکس های رزومه شما برای همیشه پاک خواهد شد
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="ml-2">انصراف</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive hover:bg-destructive/80" onClick={onDelete}>
            پاک کن
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
