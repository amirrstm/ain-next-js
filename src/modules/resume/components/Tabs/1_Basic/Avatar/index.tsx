import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { AvatarFallback } from '@radix-ui/react-avatar'
import { IconTrash, IconUpload, IconUser } from '@tabler/icons-react'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ImageCropper } from '@/components/ui/image-cropper'

import { ResumeContext } from '@/modules/resume/context'
import { removeResumeImage, updateResumeImage } from '@/modules/resume/service'

export const ProfileAvatar: React.FC = () => {
  const { resumeId } = useParams()
  const t = useTranslations('User')
  const [preview, setPreview] = useState<string>()
  const [actualImage, setActualImage] = useState('')

  const { resume } = useContext(ResumeContext)

  useEffect(() => {
    if (resume && resume.image) {
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
    onDrop,
    maxFiles: 1,
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
      'image/png': [],
    },
  })

  const handleResetImage = () => {
    setActualImage('')
  }

  const onSetFile = (file: File) => {
    updateResumeImage(file, resumeId as string)
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
          <Avatar className="w-20 h-20 bg-card cursor-pointer">
            <AvatarImage src={preview} />
            <AvatarFallback className="flex items-center justify-center w-full">
              <IconUser className="w-10 h-10" />
            </AvatarFallback>
          </Avatar>

          <Button type="button" onClick={open} size="sm" className="flex gap-2 items-center">
            <IconUpload className="w-4 h-4" />
            <span className="text-xs">{t('Upload')}</span>
          </Button>
        </div>

        {preview && (
          <div
            onClick={onRemoveImage}
            className="absolute -top-1 -right-1 bg-destructive w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
          >
            <IconTrash className="w-4 h-4" />
          </div>
        )}
      </div>

      <ImageCropper
        aspect={1}
        setFile={onSetFile}
        imgSrc={actualImage}
        title={t('CropImage')}
        onComplete={handleImageUpload}
        onResetImage={handleResetImage}
      />
    </>
  )
}
