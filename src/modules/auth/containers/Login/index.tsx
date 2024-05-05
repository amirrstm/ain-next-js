'use client'

import { useTheme } from 'next-themes'
import { useRouter, useSearchParams } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'

import { useToast } from '@/components/ui/use-toast'

import API from '@/lib/api'
import useUserStore from '@/lib/store/auth'
import { persianToEnglishNumbers } from '@/lib/utils'

import CodeForm from '../../components/CodeForm'
import LoginForm from '../../components/LoginForm'
import { getUserProfile, loginUser, verifyUser } from '../../services'
import { setUserToken } from '../../utils'

const LoginContainer: React.FC = () => {
  const router = useRouter()
  const { toast } = useToast()
  const params = useSearchParams()
  const { resolvedTheme } = useTheme()

  const { user, setUser } = useUserStore()
  const [userId, setUserId] = useState('')
  const [mobile, setMobile] = useState('')
  const [isCode, setIsCode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const { trigger, isMutating } = useSWRMutation(API.USER.LOGIN, loginUser)
  const { trigger: verifyTrigger } = useSWRMutation(API.USER.VERIFY, verifyUser)

  useEffect(() => {
    if (user) {
      router.push(`/app`)
    }
  }, [])

  useEffect(() => {
    if (params) {
      const returnUrl = params.get('returnUrl')
      const accessToken = params.get('accessToken')
      const refreshToken = params.get('refreshToken')

      if (accessToken && refreshToken) {
        setUserToken(accessToken as string, refreshToken as string)

        setGoogleLoading(true)
        getUserProfile().then(data => {
          setUser(data)
          if (data.firstName) {
            router.push(returnUrl ? returnUrl : `/app`)
          } else {
            router.push(returnUrl ? `/user-name?returnUrl=${returnUrl}` : `/user-name`)
          }
        })
      }
    }
  }, [params])

  const onSubmit = (data: { mobile: string }) => {
    trigger({ mobileNumber: persianToEnglishNumbers(data.mobile) }).then(res => {
      setIsCode(true)
      setMobile(data.mobile)

      setUserId(res.userId)
      toast({ title: res.message, variant: 'success' })
    })
  }

  const onCodeSubmit = (data: { code: string }) => {
    setLoading(true)
    const returnUrl = params.get('returnUrl')

    verifyTrigger({ code: data.code, userId })
      .then(() => {
        getUserProfile().then(data => {
          setUser(data)
          if (data.firstName) {
            router.push(returnUrl ? returnUrl : `/app`)
          } else {
            router.push(returnUrl ? `/user-name?returnUrl=${returnUrl}` : `/user-name`)
          }
        })
      })
      .catch(() => setLoading(false))
  }

  return (
    <div className="relative">
      <div
        style={{
          backgroundImage:
            resolvedTheme === 'light'
              ? 'url("/images/bg-content.svg")'
              : 'linear-gradient(rgba(15,15,15,0.7), rgba(15,15,15,0.7)),url("/images/bg-content.svg")',
        }}
        className="absolute -bottom-10 left-0 right-0 h-1/2 bg-no-repeat bg-cover bg-top -z-10 rotate-180"
      />

      <div
        style={{
          backgroundImage:
            resolvedTheme === 'light'
              ? 'url("/images/bg-content.svg")'
              : 'linear-gradient(rgba(15,15,15,0.7), rgba(15,15,15,0.7)),url("/images/bg-content.svg")',
        }}
        className="absolute -top-10  left-0 right-0 h-1/2 bg-no-repeat bg-cover bg-top -z-10"
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
          <LoginForm onSubmit={onSubmit} googleLoading={googleLoading} loading={isMutating} />
        )}
      </div>
    </div>
  )
}

export default LoginContainer
