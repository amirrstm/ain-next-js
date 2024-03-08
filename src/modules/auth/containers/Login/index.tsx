'use client'

import { useParams, useRouter } from 'next/navigation'

import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'

import { useToast } from '@/components/ui/use-toast'

import ENDPOINTS from '@/lib/Endpoints'
import useUserStore from '@/lib/store/auth'
import { persianToEnglishNumbers } from '@/lib/utils'

import CodeForm from '../../components/CodeForm'
import LoginForm from '../../components/LoginForm'
import { getUserProfile, loginUser, verifyUser } from '../../services'

const LoginContainer: React.FC = () => {
  const router = useRouter()
  const { lng } = useParams()
  const { toast } = useToast()

  const { user, setUser } = useUserStore()
  const [userId, setUserId] = useState('')
  const [mobile, setMobile] = useState('')
  const [isCode, setIsCode] = useState(false)
  const [loading, setLoading] = useState(false)

  const { trigger, isMutating } = useSWRMutation(ENDPOINTS.USER.LOGIN, loginUser)
  const { trigger: verifyTrigger } = useSWRMutation(ENDPOINTS.USER.VERIFY, verifyUser)

  useEffect(() => {
    if (user) {
      router.push(`/${lng}/app`)
    }
  }, [])

  const onSubmit = (data: { mobile: string }) => {
    trigger({ mobileNumber: persianToEnglishNumbers(data.mobile) }).then(res => {
      setIsCode(true)
      setMobile(data.mobile)

      setUserId(res.userId)
      toast({ title: res.code, variant: 'success' })
    })
  }

  const onCodeSubmit = (data: { code: string }) => {
    setLoading(true)
    verifyTrigger({ code: data.code, userId })
      .then(() => {
        getUserProfile().then(data => {
          setUser(data)
          if (data.firstName) {
            router.push(`/${lng}/app`)
          } else {
            router.push(`/${lng}/user-name`)
          }
        })
      })
      .catch(() => setLoading(false))
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
          <CodeForm
            loading={loading}
            onSubmit={onCodeSubmit}
            onBack={() => setIsCode(false)}
            onResend={() => onSubmit({ mobile })}
          />
        ) : (
          <LoginForm onSubmit={onSubmit} loading={isMutating} />
        )}
      </div>
    </div>
  )
}

export default LoginContainer
