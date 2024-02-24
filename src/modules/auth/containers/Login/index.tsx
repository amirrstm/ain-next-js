'use client'

import clsx from 'clsx'
import React, { useState } from 'react'
import useSWRMutation from 'swr/mutation'

import { useToast } from '@/components/ui/use-toast'

import ENDPOINTS from '@/lib/Endpoints'
import { persianToEnglishNumbers } from '@/lib/utils'

import CodeForm from '../../components/CodeForm'
import LoginForm from '../../components/LoginForm'
import { loginUser, verifyUser } from '../../services'

const LoginContainer: React.FC = () => {
  const { toast } = useToast()
  const [userId, setUserId] = useState('')
  const [isCode, setIsCode] = useState(true)

  const { trigger, isMutating } = useSWRMutation(ENDPOINTS.USER.LOGIN, loginUser)
  const { trigger: verifyTrigger, isMutating: verifyLoading } = useSWRMutation(ENDPOINTS.USER.VERIFY, verifyUser)

  const onSubmit = (data: { mobile: string }) => {
    trigger({ mobileNumber: persianToEnglishNumbers(data.mobile) }).then(data => {
      setIsCode(true)
      setUserId(data.userId)
      toast({ title: data.message, variant: 'success' })
    })
  }

  const onCodeSubmit = (data: { code: string }) => {
    verifyTrigger({ code: data.code, userId }).then(data => {
      console.log(data)
    })
  }

  return (
    <div className="relative">
      <div
        className={clsx(
          'absolute -bottom-10 left-0 right-0 h-1/2 bg-white bg-no-repeat bg-cover bg-top -z-10 rotate-180',
          'bg-[url("https://res.cloudinary.com/dwwcd5u9v/image/upload/v1708678667/images/banner.svg")]',
        )}
      />

      <div
        className={clsx(
          'absolute -top-10  left-0 right-0 h-1/2 bg-white bg-no-repeat bg-cover bg-top -z-10',
          'bg-[url("https://res.cloudinary.com/dwwcd5u9v/image/upload/v1708678667/images/banner.svg")]',
        )}
      />

      <div className="w-full h-full min-h-[100dvh] flex items-center justify-center p-3 sm:w-[400px] mx-auto">
        {isCode ? (
          <CodeForm onSubmit={onCodeSubmit} loading={verifyLoading} onBack={() => setIsCode(false)} />
        ) : (
          <LoginForm onSubmit={onSubmit} loading={isMutating} />
        )}
      </div>
    </div>
  )
}

export default LoginContainer
