import { useParams } from 'next/navigation'

import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { IResumeReference } from '../../interface/resume/resume.reference'

export const useReference = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.REFERENCE(resumeId as string), createReference)

  return { trigger, isMutating }
}

export async function createReference(url = '', { arg }: { arg: { references: IResumeReference[] } }): Promise<string> {
  try {
    const res = await axios.put<{ data: string }>(url, arg)

    return res.data.data
  } catch (e) {
    throw e
  }
}
