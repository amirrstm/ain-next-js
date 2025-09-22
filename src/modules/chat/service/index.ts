import API from '@/lib/api'
import axios from '@/lib/axios'

import type { Chat } from '../interface'

export async function sendMessage(url = '', { arg }: { arg: { role: string; content: string } }): Promise<Chat> {
  const res = await axios.post<{ message: string; data: Chat }>(url, arg)

  return res.data.data
}

export async function deleteChat(): Promise<Chat> {
  const res = await axios.delete(API.CHAT.DELETE)

  return res.data
}
