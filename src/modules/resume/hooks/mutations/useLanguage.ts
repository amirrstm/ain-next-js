import { useParams } from 'next/navigation'

import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { IResumeLanguage } from '../../interface/resume/resume.language'

export const useLanguage = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.LANGUAGE(resumeId as string), createLanguage)

  return { trigger, isMutating }
}

export async function createLanguage(url = '', { arg }: { arg: { languages: IResumeLanguage[] } }): Promise<string> {
  try {
    const res = await axios.put<{ data: string }>(url, arg)

    return res.data.data
  } catch (e) {
    throw e
  }
}
