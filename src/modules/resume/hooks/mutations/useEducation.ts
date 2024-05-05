import { useParams } from 'next/navigation'

import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { IResumeEducation } from '../../interface/resume/resume.education'

export const useEducation = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.EDUCATION(resumeId as string), createEducation)

  return { trigger, isMutating }
}

export async function createEducation(url = '', { arg }: { arg: { educations: IResumeEducation[] } }): Promise<string> {
  try {
    const res = await axios.put<{ data: string }>(url, arg)

    return res.data.data
  } catch (e) {
    throw e
  }
}
