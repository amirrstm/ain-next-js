import useSWR from 'swr'

import { ResponseModel } from '@/interface/General.model'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { IResumeTemplate } from '../interface/resume'

function useTemplates() {
  return useSWR(API.RESUME.GET_TEMPLATES, getTemplates, { revalidateOnFocus: false })
}

export default useTemplates

export async function getTemplates(url = ''): Promise<IResumeTemplate[]> {
  try {
    const res = await axios.get<ResponseModel<IResumeTemplate[]>>(url)

    return res.data.data
  } catch (e) {
    throw e
  }
}
