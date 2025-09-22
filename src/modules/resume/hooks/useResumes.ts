import useSWR from 'swr'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { ResponseModel } from '@/interface/General.model'
import type { IResumeResponse } from '../interface/resume'

function useResumes() {
  return useSWR(API.RESUME.GET_ALL, getResumes)
}

export default useResumes

export async function getResumes(url = ''): Promise<IResumeResponse[]> {
  const res = await axios.get<ResponseModel<IResumeResponse[]>>(url)

  return res.data.data
}
