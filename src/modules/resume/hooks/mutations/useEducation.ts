import { useParams } from 'next/navigation'
import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { IResumeEducation } from '../../interface/resume/resume.education'

export const useEducation = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.EDUCATION(resumeId as string), createEducation)

  return { isMutating, trigger }
}

export async function createEducation(url = '', { arg }: { arg: { educations: IResumeEducation[] } }): Promise<string> {
  const res = await axios.put<{ data: string }>(url, arg)

  return res.data.data
}
