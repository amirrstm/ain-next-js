'use client'

import { useRouter } from 'next/navigation'

import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'

import ENDPOINTS from '@/lib/Endpoints'
import useUserStore from '@/lib/store/auth'

import NameForm from '../../components/NameForm'
import { updateName } from '../../services'

const UserNameContainer: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { setUser, user } = useUserStore()
  const { trigger } = useSWRMutation(ENDPOINTS.USER.UPDATE_NAME, updateName)

  useEffect(() => {
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
        <NameForm onSubmit={onSubmit} loading={loading} />
      </div>
    </div>
  )
}

export default UserNameContainer
