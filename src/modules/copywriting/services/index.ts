import { ResponseModel } from '@/interface/General.model'
import { History } from '@/interface/History.model'

import axios from '@/lib/axios'
import ENDPOINTS from '@/lib/Endpoints'

import { PromptCtx } from '../interface'

export async function getPromptResponse(values: PromptCtx): Promise<History> {
  try {
    const res = await axios.put<ResponseModel<History>>(ENDPOINTS.USER.PROMPT, values)

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
