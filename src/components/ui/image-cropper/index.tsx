import { DialogTitle } from '@radix-ui/react-dialog'
import { useEffect, useRef, useState } from 'react'
import ReactCrop, { centerCrop, Crop, makeAspectCrop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import { Button } from '../button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from '../dialog'
import { canvasPreview } from './canvasPreview'

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

type Props = {
  title?: string
  imgSrc: string
  aspect?: number
  onResetImage: () => void
  setFile?: (file: File) => void | null
  onComplete: (img: string, file?: File) => void
}
export const ImageCropper: React.FC<Props> = ({
  imgSrc,
  aspect = 3 / 4,
  title = 'Crop Your Profile Picture',
  setFile,
  onComplete,
  onResetImage,
}) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)

  const [crop, setCrop] = useState<Crop>()
  const [isVisible, setVisible] = useState<boolean>(false)
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()

  useEffect(() => {
    if (imgSrc && imgSrc !== '') {
      setVisible(true)
      setCrop(undefined) // Makes crop preview update between images.
    }
  }, [imgSrc])

  useEffect(() => {
    const t = setTimeout(async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop)
      }
    }, 0)

    return () => {
      clearTimeout(t)
    }
  }, [completedCrop])

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  const handleComplete = () => {
    const canvas = previewCanvasRef.current

    if (canvas) {
      canvas.toBlob(
        blob => {
          if (blob) {
            setVisible(false)
            if (setFile) {
              setFile(new File([blob], 'fileName.jpg', { type: 'image/jpeg' }))
            }
            onComplete(window.URL.createObjectURL(blob), new File([blob], 'fileName.jpg', { type: 'image/jpeg' }))
          }
        },
        'image/jpeg',
        1,
      )
    }
  }

  const handleCloseModal = () => {
    onResetImage()
    setVisible(false)
  }

  return (
    <Dialog open={isVisible} onOpenChange={handleCloseModal}>
      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription asChild>
            <div className="py-4">
              {imgSrc && (
                <div className="rounded-md overflow-hidden text-center">
                  <ReactCrop
                    crop={crop}
                    circularCrop
                    minWidth={200}
                    minHeight={200}
                    aspect={aspect}
                    onComplete={c => setCompletedCrop(c)}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                  >
                    <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} />
                  </ReactCrop>
                </div>
              )}

              <canvas ref={previewCanvasRef} style={{ display: 'none' }} />
            </div>
          </DialogDescription>

          <DialogFooter>
            <Button type="submit" onClick={handleComplete}>
              ذخیره تغییرات
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
