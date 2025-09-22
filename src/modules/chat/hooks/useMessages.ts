import useSWR from 'swr'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { ResponseModel } from '@/interface/General.model'
import type { Chat } from '../interface'

function useMessages(enabled?: boolean) {
  const { data, isLoading, mutate } = useSWR(enabled ? API.CHAT.GET : undefined, getMessages, {
    revalidateOnFocus: false
  })

  return { data, isLoading, mutate }
}

export default useMessages

export async function getMessages(url = ''): Promise<Chat> {
  const res = await axios.get<ResponseModel<Chat>>(url)

  return res.data.data
}
