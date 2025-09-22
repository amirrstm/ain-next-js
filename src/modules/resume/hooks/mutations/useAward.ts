import { useParams } from 'next/navigation'
import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { IResumeAward } from '../../interface/resume/resume.award'

export const useAward = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.AWARD(resumeId as string), createAward)

  return { isMutating, trigger }
}

export async function createAward(url = '', { arg }: { arg: { awards: IResumeAward[] } }): Promise<string> {
  const res = await axios.put<{ data: string }>(url, arg)

  return res.data.data
}
