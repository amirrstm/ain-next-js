import { useParams } from 'next/navigation'
import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { IResumeProfile } from '../../interface/resume/resume.profile'

export const useProfile = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.PROFILE(resumeId as string), createProfile)

  return { isMutating, trigger }
}

export async function createProfile(url = '', { arg }: { arg: { profiles: IResumeProfile[] } }): Promise<string> {
  const res = await axios.put<{ data: string }>(url, arg)

  return res.data.data
}
