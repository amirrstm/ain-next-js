import { AvatarFallback } from '@radix-ui/react-avatar'
import { IconTrash, IconUpload, IconUser } from '@tabler/icons-react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ImageCropper } from '@/components/ui/image-cropper'
import { ResumeContext } from '@/modules/resume/context'
import { removeResumeImage, updateResumeImage } from '@/modules/resume/service'

import type React from 'react'

export const ProfileAvatar: React.FC = () => {
  const { resumeId } = useParams()
  const t = useTranslations('User')
  const [preview, setPreview] = useState<string>()
  const [actualImage, setActualImage] = useState('')

  const { resume, mutate } = useContext(ResumeContext)

  useEffect(() => {
    if (resume?.image) {
      setPreview(resume.image.completedUrl)
    }
  }, [resume])

  const onDrop = useCallback(async (files: File[]) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => setActualImage((reader.result || '').toString()))
    reader.readAsDataURL(files[0])
  }, [])

  const handleImageUpload = (blob: string) => {
    setPreview(blob)
    setActualImage('')
  }

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
      'image/png': []
    },
    maxFiles: 1,
    onDrop
  })

  const handleResetImage = () => {
    setActualImage('')
  }

  const onSetFile = (file: File) => {
    updateResumeImage(file, resumeId as string).then(() => {
      mutate()
    })
  }

  const onRemoveImage = () => {
    setPreview(undefined)

    removeResumeImage(resumeId as string)
  }

  return (
    <>
      <div className="relative">
        <div {...getRootProps()} className="flex flex-col items-center gap-3">
          <input {...getInputProps()} />
          <Avatar className="h-20 w-20 cursor-pointer bg-card">
            <AvatarImage src={preview} />
            <AvatarFallback className="flex w-full items-center justify-center">
              <IconUser className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>

          <Button className="flex items-center gap-2" onClick={open} size="sm" type="button">
            <IconUpload className="h-4 w-4" />
            <span className="text-xs">{t('Upload')}</span>
          </Button>
        </div>

        {preview && (
          <div
            className="-top-1 -right-1 absolute flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-destructive"
            onClick={onRemoveImage}
          >
            <IconTrash className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      <ImageCropper
        aspect={1}
        imgSrc={actualImage}
        onComplete={handleImageUpload}
        onResetImage={handleResetImage}
        setFile={onSetFile}
        title={t('CropImage')}
      />
    </>
  )
}
