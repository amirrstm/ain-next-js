import API from '@/lib/api'
import axios from '@/lib/axios'

import { IResume } from '../interface/resume'

export const getOccupations = async (
  { search }: { search: string },
  signal: AbortSignal,
): Promise<{ name: string }[]> => {
  try {
    const response = await axios.get(API.DATA.OCCUPATIONS, {
      signal,
      params: { search: search !== '' ? search : undefined },
    })
    return response.data.data
  } catch (e) {
    throw e
  }
}

export async function createResume(url = ''): Promise<string> {
  try {
    const res = await axios.post<{ data: string }>(url)

    return res.data.data
  } catch (e) {
    throw e
  }
}

export async function getResume(url = ''): Promise<IResume> {
  try {
    const res = await axios.get<{ data: IResume }>(url)

    return res.data.data
  } catch (e) {
    throw e
  }
}

export async function uploadResumeVoice(file: File, resumeId: string): Promise<void> {
  try {
    const formData = new FormData()
    formData.append('file', file)

    await axios.put(API.RESUME.UPLOAD_VOICE(resumeId), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  } catch (e) {
    throw e
  }
}
