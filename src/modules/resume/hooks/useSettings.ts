import useSWR from 'swr'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { ResponseModel } from '@/interface/General.model'
import type { IResumeTemplateSettings } from '../interface/resume'

function useSettings(resumeId?: string) {
  return useSWR(!resumeId ? undefined : API.RESUME.GET_SETTINGS(resumeId), getSettings, { revalidateOnFocus: false })
}

export default useSettings

export async function getSettings(url = ''): Promise<IResumeTemplateSettings> {
  const res = await axios.get<ResponseModel<IResumeTemplateSettings>>(url)

  return res.data.data
}
