import { AxiosResponse } from 'axios'

import { ResponseModel } from '@/interface/General.model'
import { History } from '@/interface/History.model'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { PromptCtx } from '../interface'

export async function getPromptResponse(values: PromptCtx): Promise<History> {
  try {
    const res = await axios.put<ResponseModel<History>>(API.USER.PROMPT, values)

    return res.data.data
  } catch (e) {
    throw e
  }
}

export async function putFeedback(url = '', { arg }: { arg: { text?: string; liked: boolean } }): Promise<string> {
  try {
    const res = await axios.put<{ message: string; data: string }>(url, { feedback: arg })

    return res.data.message
  } catch (e) {
    throw e
  }
}

export async function requestTemplate(
  url = '',
  { arg }: { arg: { name: string; description?: string } },
): Promise<any> {
  try {
    const res = await axios.post<AxiosResponse<any>>(url, arg)

    return res.data.data
  } catch (e) {
    throw e
  }
}
