import useSWR from 'swr'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { IResumeResponse } from '../interface/resume'

function useResume(resumeId?: string) {
  return useSWR(!resumeId ? undefined : API.RESUME.GET_ONE(resumeId as string), getResume, {
    revalidateIfStale: false,
    revalidateOnFocus: false
  })
}

export default useResume

export async function getResume(url = ''): Promise<IResumeResponse> {
  const res = await axios.get<{ data: IResumeResponse }>(url)

  return res.data.data
}
