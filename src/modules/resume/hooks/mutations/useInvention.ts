import { useParams } from 'next/navigation'
import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { IResumeInvention } from '../../interface/resume/resume.invention'

export const useInvention = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.INVENTION(resumeId as string), createInvention)

  return { isMutating, trigger }
}

export async function createInvention(url = '', { arg }: { arg: { inventions: IResumeInvention[] } }): Promise<string> {
  const res = await axios.put<{ data: string }>(url, arg)

  return res.data.data
}
