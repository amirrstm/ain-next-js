import { useTranslations } from 'next-intl'

import { IconThumbDown, IconThumbDownFilled, IconThumbUp, IconThumbUpFilled, IconX } from '@tabler/icons-react'
import clsx from 'clsx'
import React, { useState } from 'react'
import { toast } from 'sonner'
import useSWRMutation from 'swr/mutation'

import { Button } from '@/components/ui/button'

import API from '@/lib/api'

import { putFeedback } from '../../services'

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
    { text: t('Content.FeedbackMessages.Fourth') },
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
        <div className="p-4 border-t flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              onClick={onIgnore}
              className="w-6 h-6 border cursor-pointer flex items-center justify-center rounded-full"
            >
              <IconX className="w-4 h-4" />
            </div>
            <p className="hidden md:block text-gray-600">{t('Content.Feedback')}</p>
          </div>

          <div className="flex flex-1 overflow-x-auto gap-1">
            {messages.map((message, index) => (
              <Button key={index} variant="outline" className="flex-shrink-0" onClick={() => onMessage(message.text)}>
                {message.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 flex items-center justify-between border-t">
        <p>{t('Content.Feedback')}</p>

        <div className="flex gap-6">
          {status === 'dislike' ? (
            <IconThumbDownFilled className={clsx('w-7 h-7 text-red-500 cursor-pointer')} />
          ) : (
            <IconThumbDown onClick={onDislike} className={clsx('w-7 h-7 text-gray-400 cursor-pointer')} />
          )}

          {status === 'like' ? (
            <IconThumbUpFilled className={clsx('w-7 h-7 text-green-500 cursor-pointer')} />
          ) : (
            <IconThumbUp onClick={onLike} className={clsx('w-7 h-7 text-gray-400 cursor-pointer')} />
          )}
        </div>
      </div>
    </>
  )
}

export default Feedback
