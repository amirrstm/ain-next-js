import useSWR from 'swr'

import { ResponseModel } from '@/interface/General.model'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { IResumeResponse } from '../interface/resume'

function useResumes() {
  return useSWR(API.RESUME.GET_ALL, getResumes)
}

export default useResumes

export async function getResumes(url = ''): Promise<IResumeResponse[]> {
  try {
    const res = await axios.get<ResponseModel<IResumeResponse[]>>(url)

    return res.data.data
  } catch (e) {
    throw e
  }
}
