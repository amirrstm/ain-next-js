'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'

import { useRouter } from '@/components/ui/navigation'
import { LOGIN_BG } from '@/constants'
import API from '@/lib/api'
import useUserStore from '@/lib/store/auth'

import NameForm from '../../components/NameForm'
import { updateName } from '../../services'

import type React from 'react'

const UserNameContainer: React.FC = () => {
  const router = useRouter()
  const params = useSearchParams()

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

    if (user?.firstName) {
      router.push(`/app`)
    }
  }, [params.get, router.push, user])

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

      <div className="mx-auto flex h-full min-h-[100dvh] w-full items-center justify-center p-3 sm:w-[350px]">
        <div className="w-full animate-slide-in-blurred-bottom delay-300">
          <NameForm loading={loading} onSubmit={onSubmit} returnUrl={returnUrl} />
        </div>
      </div>
    </div>
  )
}

export default UserNameContainer
