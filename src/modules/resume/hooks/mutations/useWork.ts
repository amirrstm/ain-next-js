import { useParams } from 'next/navigation'
import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { IResumeWork } from '../../interface/resume/resume.work'

export const useWork = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.WORK(resumeId as string), createWork)

  return { isMutating, trigger }
}

export async function createWork(url = '', { arg }: { arg: { works: IResumeWork[] } }): Promise<string> {
  const res = await axios.put<{ data: string }>(url, arg)

  return res.data.data
}
