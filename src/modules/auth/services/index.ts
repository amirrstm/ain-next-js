import { AxiosResponse } from 'axios'

import { ResponseModel } from '@/interface/General.model'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { Login } from '../interface'
import { User } from '../interface/auth.model'
import { setUserToken } from '../utils'

export async function loginUser(
  url = '',
  { arg }: { arg: { mobileNumber: string } },
): Promise<{ message: string; userId: string }> {
  try {
    const res = await axios.post<{ message: string; data: { userId: string } }>(url, arg)

    return {
      message: res.data.message,
      userId: res.data.data.userId,
    }
  } catch (e) {
    throw e
  }
}

export async function verifyUser(url = '', { arg }: { arg: { code: string; userId: string } }): Promise<Login> {
  try {
    const res = await axios.post<ResponseModel<Login>>(url, arg)

    setUserToken(res.data.data.accessToken, res.data.data.refreshToken)
    return res.data.data
  } catch (e) {
    throw e
  }
}

export async function updateName(url = '', { arg }: { arg: { firstName: string; lastName?: string } }): Promise<User> {
  try {
    const res = await axios.put<AxiosResponse<User>>(url, arg)

    return res.data.data
  } catch (e) {
    throw e
  }
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
