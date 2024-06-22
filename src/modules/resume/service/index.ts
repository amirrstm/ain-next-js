import API from '@/lib/api'
import axios from '@/lib/axios'

import { IResume, IResumeTemplateSettings } from '../interface/resume'

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

export const getStudyFields = async (
  { search }: { search: string },
  signal: AbortSignal,
): Promise<{ name: string }[]> => {
  try {
    const response = await axios.get(API.DATA.STUDY_FIELDS, {
      signal,
      params: { search: search !== '' ? search : undefined },
    })
    return response.data.data
  } catch (e) {
    throw e
  }
}

export const getUniversities = async (
  { search }: { search: string },
  signal: AbortSignal,
): Promise<{ name: string }[]> => {
  try {
    const response = await axios.get(API.DATA.UNIVERSITIES, {
      signal,
      params: { search: search !== '' ? search : undefined },
    })
    return response.data.data
  } catch (e) {
    throw e
  }
}

export const getCompanies = async (
  { search }: { search: string },
  signal: AbortSignal,
): Promise<{ name: string }[]> => {
  try {
    const response = await axios.get(API.DATA.COMPANIES, {
      signal,
      params: { search: search !== '' ? search : undefined },
    })
    return response.data.data
  } catch (e) {
    throw e
  }
}

export const getSkills = async ({ search }: { search: string }, signal: AbortSignal): Promise<{ name: string }[]> => {
  try {
    const response = await axios.get(API.DATA.SKILLS, {
      signal,
      params: { search: search !== '' ? search : undefined },
    })
    return response.data.data
  } catch (e) {
    throw e
  }
}

export async function createResume(url = '', { arg }: { arg: { title: string; template?: string } }): Promise<string> {
  try {
    const res = await axios.post<{ data: string }>(url, arg)

    return res.data.data
  } catch (e) {
    throw e
  }
}

export async function updateResumeTitle(resumeId: string, title: string): Promise<string> {
  try {
    const res = await axios.put(API.RESUME.UPDATE_TITLE(resumeId), { title })

    return res.data.data
  } catch (e) {
    throw e
  }
}

export async function updateResumeTemplate(resumeId: string, data: { template: string }): Promise<string> {
  try {
    const res = await axios.put(API.RESUME.UPDATE_TEMPLATE(resumeId), data)

    return res.data.data
  } catch (e) {
    throw e
  }
}

export async function updateResumeSettings(resumeId: string, data: IResumeTemplateSettings): Promise<string> {
  try {
    const res = await axios.put(API.RESUME.GET_SETTINGS(resumeId), data)

    return res.data.data
  } catch (e) {
    throw e
  }
}

export async function updateDownload(resumeId: string): Promise<string> {
  try {
    const res = await axios.post(API.RESUME.UPDATE_DOWNLOAD(resumeId), {})

    return res.data.data.url
  } catch (e) {
    throw e
  }
}

export async function uploadResumeVoice(file: File, resumeId: string): Promise<string> {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const res = await axios.put(API.RESUME.UPLOAD_VOICE(resumeId), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return res.data.data.text
  } catch (e) {
    throw e
  }
}

export async function createResumeFromVoice(
  url = '',
  { arg }: { arg: { file: File; template: string } },
): Promise<string> {
  try {
    const formData = new FormData()
    formData.append('file', arg.file)
    formData.append('template', arg.template)

    const res = await axios.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return res.data.data
  } catch (e) {
    throw e
  }
}

export async function createResumeFromOccupation(
  url = '',
  {
    arg: { occupation, template, description },
  }: { arg: { occupation: string; template: string; description?: string } },
): Promise<string> {
  try {
    const res = await axios.post(url, { template, occupation, description })

    return res.data.data
  } catch (e) {
    throw e
  }
}

export async function createResumeBio(resumeId: string): Promise<string> {
  try {
    const res = await axios.get(API.RESUME.AI_BIO_CREATE(resumeId))

    return res.data.data.text
  } catch (e) {
    throw e
  }
}

export async function createResumeHighligh(resumeId: string, title: string, type: string): Promise<string> {
  try {
    const res = await axios.put(API.RESUME.AI_HIGHLIGHT_CREATE(resumeId), { title, type })

    return res.data.data.text
  } catch (e) {
    throw e
  }
}

export async function updateResumeImage(file: File, resumeId: string): Promise<string> {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const res = await axios.put(API.RESUME.UPLOAD_IMAGE(resumeId), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return res.data.data
  } catch (e) {
    throw e
  }
}

export async function removeResumeImage(resumeId: string): Promise<string> {
  try {
    const res = await axios.delete(API.RESUME.UPLOAD_IMAGE(resumeId))

    return res.data.data
  } catch (e) {
    throw e
  }
}

export async function deleteResume(resumeId: string): Promise<string> {
  try {
    const res = await axios.delete(API.RESUME.DELETE(resumeId))

    return res.data
  } catch (e) {
    throw e
  }
}
