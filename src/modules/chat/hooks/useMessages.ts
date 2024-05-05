import useSWR from 'swr'

import { Category } from '@/interface/Category.model'
import { ResponseModel } from '@/interface/General.model'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { Chat } from '../interface'

function useMessages(enabled?: boolean) {
  const { data, isLoading, mutate } = useSWR(enabled ? API.CHAT.GET : undefined, getMessages, {
    revalidateOnFocus: false,
  })

  return { data, mutate, isLoading }
}

export default useMessages

export async function getMessages(url = ''): Promise<Chat> {
  try {
    const res = await axios.get<ResponseModel<Chat>>(url)

    return res.data.data
  } catch (e) {
    throw e
  }
}
