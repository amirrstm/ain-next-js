import { useTranslations } from 'next-intl'

import { AvatarFallback } from '@radix-ui/react-avatar'
import { IconUpload, IconUser } from '@tabler/icons-react'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ImageCropper } from '@/components/ui/image-cropper'

type Props = { image?: string }
export const ProfileAvatar: React.FC<Props> = ({ image }) => {
  const t = useTranslations('User')
  const [preview, setPreview] = useState<string>()
  const [actualImage, setActualImage] = useState('')

  useEffect(() => {
    if (image) {
      setPreview(image)
    }
  }, [image])

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
    // uploadFile(file).then((fileData) => {
    //   setProfileImage(userId, fileData.id).then((data) => {
    //     message.success(data.message);
    //     if (userId === profile.id) {
    //       setProfile({ ...profile, avatar: fileData.root_file.path });
    //     }
    //   });
    // });
  }

  const onRemoveImage = () => {
    setPreview(undefined)
    // setProfileImage(userId, null).then((data) => {
    //   message.success(data.message);

    //   if (userId === profile.id) {
    //     setProfile({ ...profile, avatar: null });
    //   }
    // });
  }

  return (
    <>
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
