import useSWR from 'swr'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { ResponseModel } from '@/interface/General.model'
import type { IResumeTemplate } from '../interface/resume'

function useTemplates() {
  return useSWR(API.RESUME.GET_TEMPLATES, getTemplates, { revalidateOnFocus: false })
}

export default useTemplates

export async function getTemplates(url = ''): Promise<IResumeTemplate[]> {
  const res = await axios.get<ResponseModel<IResumeTemplate[]>>(url)

  return res.data.data
}
