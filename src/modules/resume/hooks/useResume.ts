import useSWR from 'swr'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { IResumeResponse } from '../interface/resume'

function useResume(resumeId?: string) {
  return useSWR(!resumeId ? undefined : API.RESUME.GET_ONE(resumeId as string), getResume, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })
}

export default useResume

export async function getResume(url = ''): Promise<IResumeResponse> {
  try {
    const res = await axios.get<{ data: IResumeResponse }>(url)

    return res.data.data
  } catch (e) {
    throw e
  }
}
