import API from '@/lib/api'
import axios from '@/lib/axios'

import { setUserToken } from '../utils'

import type { AxiosResponse } from 'axios'
import type { ResponseModel } from '@/interface/General.model'
import type { Login } from '../interface'
import type { User } from '../interface/auth.model'

export async function loginUser(
  url = '',
  { arg }: { arg: { mobileNumber: string } }
): Promise<{ message: string; userId: string }> {
  const res = await axios.post<{ message: string; data: { userId: string } }>(url, arg)

  return {
    message: res.data.message,
    userId: res.data.data.userId
  }
}

export async function verifyUser(url = '', { arg }: { arg: { code: string; userId: string } }): Promise<Login> {
  const res = await axios.post<ResponseModel<Login>>(url, arg)

  setUserToken(res.data.data.accessToken, res.data.data.refreshToken)
  return res.data.data
}

export async function updateName(url = '', { arg }: { arg: { firstName: string; lastName?: string } }): Promise<User> {
  const res = await axios.put<AxiosResponse<User>>(url, arg)

  return res.data.data
}

export async function getUserProfile(): Promise<User> {
  try {
    const res: AxiosResponse<{ data: User }> = await axios.get(API.USER.GET_PROFILE)
    return res.data.data
  } catch {
    throw new Error()
  }
}

export async function refreshAccessToken(): Promise<Login> {
  try {
    const res: AxiosResponse<{ data: Login }> = await axios.post(API.USER.REFRESH_TOKEN, {})

    setUserToken(res.data.data.accessToken, res.data.data.refreshToken)
    return res.data.data
  } catch {
    throw new Error()
  }
}
