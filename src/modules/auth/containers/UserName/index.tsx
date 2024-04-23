'use client'

import { useTheme } from 'next-themes'
import { useRouter, useSearchParams } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'

import ENDPOINTS from '@/lib/Endpoints'
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
  const { trigger } = useSWRMutation(ENDPOINTS.USER.UPDATE_NAME, updateName)

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
        <NameForm onSubmit={onSubmit} returnUrl={returnUrl} loading={loading} />
      </div>
    </div>
  )
}

export default UserNameContainer
