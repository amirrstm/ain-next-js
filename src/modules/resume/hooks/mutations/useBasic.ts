import { useParams } from 'next/navigation'
import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { IResumeBasic } from '../../interface/resume/resume.basic'

export const useBasic = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.BASIC(resumeId as string), createBasic)

  return { isMutating, trigger }
}

export async function createBasic(url = '', { arg }: { arg: IResumeBasic }): Promise<string> {
  const res = await axios.put<{ data: string }>(url, arg)

  return res.data.data
}
