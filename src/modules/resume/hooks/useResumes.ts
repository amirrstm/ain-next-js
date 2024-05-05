import useSWR from 'swr'

import { ResponseModel } from '@/interface/General.model'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { Province } from '../interface/resume/resume.data'

function useResumes() {
  const { data, isLoading } = useSWR(API.RESUME.GET_ALL, getResumes, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  return { data, isLoading }
}

export default useResumes

export async function getResumes(url = ''): Promise<Province[]> {
  try {
    const res = await axios.get<ResponseModel<Province[]>>(url)

    return res.data.data
  } catch (e) {
    throw e
  }
}
