import API from '@/lib/api'
import axios from '@/lib/axios'

import { Chat } from '../interface'

export async function sendMessage(url = '', { arg }: { arg: { role: string; content: string } }): Promise<Chat> {
  try {
    const res = await axios.post<{ message: string; data: Chat }>(url, arg)

    return res.data.data
  } catch (e) {
    throw e
  }
}

export async function deleteChat(): Promise<Chat> {
  try {
    const res = await axios.delete(API.CHAT.DELETE)

    return res.data
  } catch (e) {
    throw e
  }
}
