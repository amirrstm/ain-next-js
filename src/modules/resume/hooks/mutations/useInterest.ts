import { useParams } from 'next/navigation'

import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { IResumeInterest } from '../../interface/resume/resume.interest'

export const useInterest = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.INTEREST(resumeId as string), createInterest)

  return { trigger, isMutating }
}

export async function createInterest(url = '', { arg }: { arg: { interests: IResumeInterest[] } }): Promise<string> {
  try {
    const res = await axios.put<{ data: string }>(url, arg)

    return res.data.data
  } catch (e) {
    throw e
  }
}
