import useSWR from 'swr'

import { ResponseModel } from '@/interface/General.model'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { IResumeResponse } from '../interface/resume'

function useResumes() {
  const { data, isLoading, mutate } = useSWR(API.RESUME.GET_ALL, getResumes, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  return { data, mutate, isLoading }
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
