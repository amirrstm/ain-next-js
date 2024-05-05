import { useParams } from 'next/navigation'

import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { IResumeVolunteer } from '../../interface/resume/resume.volunteer'

export const useVolunteer = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.VOLUNTEER(resumeId as string), createVolunteer)

  return { trigger, isMutating }
}

export async function createVolunteer(url = '', { arg }: { arg: { volunteers: IResumeVolunteer[] } }): Promise<string> {
  try {
    const res = await axios.put<{ data: string }>(url, arg)

    return res.data.data
  } catch (e) {
    throw e
  }
}
