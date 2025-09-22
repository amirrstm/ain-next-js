import API from '@/lib/api'
import axios from '@/lib/axios'

import type { AxiosResponse } from 'axios'
import type { ResponseModel } from '@/interface/General.model'
import type { History } from '@/interface/History.model'
import type { PromptCtx } from '../interface'

export async function getPromptResponse(values: PromptCtx): Promise<History> {
  const res = await axios.put<ResponseModel<History>>(API.USER.PROMPT, values)

  return res.data.data
}

export async function putFeedback(url = '', { arg }: { arg: { text?: string; liked: boolean } }): Promise<string> {
  const res = await axios.put<{ message: string; data: string }>(url, { feedback: arg })

  return res.data.message
}

export async function requestTemplate(url = '', { arg }: { arg: { name: string; description?: string } }): Promise<unknown> {
  const res = await axios.post<AxiosResponse<unknown>>(url, arg)

  return res.data.data
}
