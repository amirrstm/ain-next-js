import { useParams } from 'next/navigation'

import useSWRMutation from 'swr/mutation'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { IResumePublication } from '../../interface/resume/resume.publication'

export const usePublication = () => {
  const { resumeId } = useParams()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.PUBLICATION(resumeId as string), createPublication)

  return { trigger, isMutating }
}

export async function createPublication(
  url = '',
  { arg }: { arg: { publications: IResumePublication[] } },
): Promise<string> {
  try {
    const res = await axios.put<{ data: string }>(url, arg)

    return res.data.data
  } catch (e) {
    throw e
  }
}
