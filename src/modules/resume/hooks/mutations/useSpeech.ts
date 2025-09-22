import { useParams } from 'next/navigation'
import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { IResumeSpeech } from '../../interface/resume/resume.speech'

export const useSpeech = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.SPEECH(resumeId as string), createSpeech)

  return { isMutating, trigger }
}

export async function createSpeech(url = '', { arg }: { arg: { speeches: IResumeSpeech[] } }): Promise<string> {
  const res = await axios.put<{ data: string }>(url, arg)

  return res.data.data
}
