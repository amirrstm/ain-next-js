'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import useSWRMutation from 'swr/mutation'

import { LOGIN_BG } from '@/constants'
import API from '@/lib/api'
import useUserStore from '@/lib/store/auth'
import { persianToEnglishNumbers } from '@/lib/utils'

import CodeForm from '../../components/CodeForm'
import LoginForm from '../../components/LoginForm'
import { getUserProfile, loginUser, verifyUser } from '../../services'
import { setUserToken } from '../../utils'

const LoginContainer: React.FC = () => {
  const router = useRouter()

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
      toast.success(res.message)
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
      <div className="absolute bg-[#000002] w-screen h-screen inset-0 -z-10">
        <Image
          priority
          width={1440}
          height={960}
          alt="login-bg"
          src={LOGIN_BG}
          className="w-full h-full md:object-contain object-cover max-w-[1440px] mx-auto animate-blur-image"
        />
      </div>

      <div className="w-full h-full min-h-[100dvh] flex items-center justify-center p-3 sm:w-[400px] mx-auto">
        {isCode ? (
          <div className="animate-slide-in-blurred-bottom delay-300 w-full">
            <CodeForm
              loading={loading}
              onSubmit={onCodeSubmit}
              onBack={() => setIsCode(false)}
              onResend={() => onSubmit({ mobile })}
            />
          </div>
        ) : (
          <div className="animate-slide-in-blurred-bottom delay-300">
            <LoginForm onSubmit={onSubmit} googleLoading={googleLoading} loading={isMutating} />
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginContainer
