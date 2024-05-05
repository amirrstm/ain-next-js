'use client'

import { useRouter } from 'next/navigation'

import React from 'react'
import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'

import ResumeEmpty from '../../components/Empty'
import useResumes from '../../hooks/useResumes'
import { createResume } from '../../service'

const ResumeListContainer: React.FC = () => {
  const router = useRouter()

  const { data } = useResumes()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.POST, createResume)

  const onCreate = () => {
    trigger().then(data => {
      router.push(`/app/resume/${data}`)
    })
  }

  return (
    <div>
      <ResumeEmpty loading={isMutating} onCreate={onCreate} />
    </div>
  )
}

export default ResumeListContainer
