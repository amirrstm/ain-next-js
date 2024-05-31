'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'

import { LOGIN_BG } from '@/constants'
import API from '@/lib/api'
import useUserStore from '@/lib/store/auth'

import NameForm from '../../components/NameForm'
import { updateName } from '../../services'

const UserNameContainer: React.FC = () => {
  const router = useRouter()
  const params = useSearchParams()
  const { resolvedTheme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [returnUrl, setReturnUrl] = useState<string>()

  const { setUser, user } = useUserStore()
  const { trigger } = useSWRMutation(API.USER.UPDATE_NAME, updateName)

  useEffect(() => {
    if (!user) {
      router.push(`/login`)
      return
    }

    const paramReturnUrl = params.get('returnUrl')
    if (paramReturnUrl) {
      setReturnUrl(paramReturnUrl)
    }

    if (user && user.firstName) {
      router.push(`/app`)
    }
  }, [])

  const onSubmit = (data: { name: string }) => {
    const nameSplit = data.name.split(' ')

    setLoading(true)
    trigger({ firstName: nameSplit[0], lastName: nameSplit[1] })
      .then(() => {
        if (user) {
          setUser({ ...user, firstName: nameSplit[0], lastName: nameSplit[1] })
        }
        router.push(`/app`)
      })
      .catch(() => setLoading(false))
  }

  return (
    <div className="relative">
      <div className="absolute bg-[#000002] w-screen h-screen inset-0 -z-10">
        <Image
          width={1440}
          height={960}
          alt="login-bg"
          src={LOGIN_BG}
          className="w-full h-full md:object-contain object-cover max-w-[1440px] mx-auto animate-blur-image"
        />
      </div>

      <div className="w-full h-full min-h-[100dvh] flex items-center justify-center p-3 sm:w-[350px] mx-auto">
        <div className="animate-slide-in-blurred-bottom delay-300 w-full">
          <NameForm onSubmit={onSubmit} returnUrl={returnUrl} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default UserNameContainer
