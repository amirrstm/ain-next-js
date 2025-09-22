'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import useSWRMutation from 'swr/mutation'

import { useRouter } from '@/components/ui/navigation'
import { LOGIN_BG } from '@/constants'
import API from '@/lib/api'
import useUserStore from '@/lib/store/auth'
import { persianToEnglishNumbers } from '@/lib/utils'

import CodeForm from '../../components/CodeForm'
import LoginForm from '../../components/LoginForm'
import { getUserProfile, loginUser, verifyUser } from '../../services'
import { setUserToken } from '../../utils'

import type React from 'react'

const LoginContainer: React.FC = () => {
  const router = useRouter()

  const params = useSearchParams()

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
  }, [router.push, user])

  useEffect(() => {
    if (params) {
      const returnUrl = params.get('returnUrl')
      const accessToken = params.get('accessToken')
      const refreshToken = params.get('refreshToken')

      if (accessToken && refreshToken) {
        setUserToken(accessToken as string, refreshToken as string)

        setGoogleLoading(true)
        getUserProfile().then((data) => {
          setUser(data)
          if (data.firstName) {
            router.push(returnUrl ? returnUrl : `/app`)
          } else {
            router.push(returnUrl ? `/user-name?returnUrl=${returnUrl}` : `/user-name`)
          }
        })
      }
    }
  }, [params, router.push, setUser])

  const onSubmit = (data: { mobile: string }) => {
    trigger({ mobileNumber: persianToEnglishNumbers(data.mobile) }).then((res) => {
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
        getUserProfile().then((data) => {
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
      <div className="-z-10 absolute inset-0 h-screen w-screen bg-[#000002]">
        <Image
          alt="login-bg"
          className="mx-auto h-full w-full max-w-[1440px] animate-blur-image object-cover md:object-contain"
          height={960}
          priority
          src={LOGIN_BG}
          width={1440}
        />
      </div>

      <div className="mx-auto flex h-full min-h-[100dvh] w-full items-center justify-center p-3 sm:w-[400px]">
        {isCode ? (
          <div className="w-full animate-slide-in-blurred-bottom delay-300">
            <CodeForm
              loading={loading}
              onBack={() => setIsCode(false)}
              onResend={() => onSubmit({ mobile })}
              onSubmit={onCodeSubmit}
            />
          </div>
        ) : (
          <div className="animate-slide-in-blurred-bottom delay-300">
            <LoginForm googleLoading={googleLoading} loading={isMutating} onSubmit={onSubmit} />
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginContainer
