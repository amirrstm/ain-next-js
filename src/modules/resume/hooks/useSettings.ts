import useSWR from 'swr'

import { ResponseModel } from '@/interface/General.model'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { IResumeTemplateSettings } from '../interface/resume'

function useSettings(resumeId?: string) {
  return useSWR(!resumeId ? undefined : API.RESUME.GET_SETTINGS(resumeId), getSettings, { revalidateOnFocus: false })
}

export default useSettings

export async function getSettings(url = ''): Promise<IResumeTemplateSettings> {
  try {
    const res = await axios.get<ResponseModel<IResumeTemplateSettings>>(url)

    return res.data.data
  } catch (e) {
    throw e
  }
}
