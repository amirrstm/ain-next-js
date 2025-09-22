import { IconThumbDown, IconThumbDownFilled, IconThumbUp, IconThumbUpFilled, IconX } from '@tabler/icons-react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'
import useSWRMutation from 'swr/mutation'

import { Button } from '@/components/ui/button'
import API from '@/lib/api'

import { putFeedback } from '../../services'

import type React from 'react'

const Feedback: React.FC<{ id: string }> = ({ id }) => {
  const t = useTranslations('Copywriting')
  const [status, setStatus] = useState<string>('')

  const [submitted, setSubmitted] = useState<boolean>(false)
  const [hasFeedbackText, setHasFeedbackText] = useState<boolean>(false)
  const { trigger } = useSWRMutation(API.HISTORY.FEEDBACK(id), putFeedback)

  const messages = [
    { text: t('Content.FeedbackMessages.First') },
    { text: t('Content.FeedbackMessages.Second') },
    { text: t('Content.FeedbackMessages.Third') },
    { text: t('Content.FeedbackMessages.Fourth') }
  ]

  const onLike = () => {
    setStatus('like')
    toast.success(t('Content.FeedbackSuccess'))
    trigger({ liked: true }).then(() => setSubmitted(true))
  }

  const onDislike = () => {
    setStatus('dislike')
    setHasFeedbackText(true)
    trigger({ liked: false })
  }

  const onMessage = (text: string) => {
    trigger({ liked: false, text }).then(() => setSubmitted(true))
  }

  const onIgnore = () => {
    setHasFeedbackText(false)
    setSubmitted(true)
  }

  if (submitted) return null

  return (
    <>
      {hasFeedbackText && (
        <div className="flex items-center gap-4 border-t p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border" onClick={onIgnore}>
              <IconX className="h-4 w-4" />
            </div>
            <p className="hidden text-gray-600 md:block">{t('Content.Feedback')}</p>
          </div>

          <div className="flex flex-1 gap-1 overflow-x-auto">
            {messages.map((message, index) => (
              <Button className="flex-shrink-0" key={index} onClick={() => onMessage(message.text)} variant="outline">
                {message.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-t p-4">
        <p>{t('Content.Feedback')}</p>

        <div className="flex gap-6">
          {status === 'dislike' ? (
            <IconThumbDownFilled className={clsx('h-7 w-7 cursor-pointer text-red-500')} />
          ) : (
            <IconThumbDown className={clsx('h-7 w-7 cursor-pointer text-gray-400')} onClick={onDislike} />
          )}

          {status === 'like' ? (
            <IconThumbUpFilled className={clsx('h-7 w-7 cursor-pointer text-green-500')} />
          ) : (
            <IconThumbUp className={clsx('h-7 w-7 cursor-pointer text-gray-400')} onClick={onLike} />
          )}
        </div>
      </div>
    </>
  )
}

export default Feedback
