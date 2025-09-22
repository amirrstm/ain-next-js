import { useParams } from 'next/navigation'
import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { IResumeTeaching } from '../../interface/resume/resume.teaching'

export const useTeaching = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.TEACHING(resumeId as string), createTeaching)

  return { isMutating, trigger }
}

export async function createTeaching(url = '', { arg }: { arg: { teachings: IResumeTeaching[] } }): Promise<string> {
  const res = await axios.put<{ data: string }>(url, arg)

  return res.data.data
}
