import { ResponseModel } from '@/interface/General.model'

import axios from '@/lib/axios'

import { Login } from '../interface'
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
