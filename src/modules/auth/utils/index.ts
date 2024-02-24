import { setCookie } from 'cookies-next'

export const setUserToken = (token: string, refreshToken?: string) => {
  setCookie('token', token)
  localStorage.setItem('accessToken', token)
  if (refreshToken) {
    setCookie('refreshToken', refreshToken)
    localStorage.setItem('refreshToken', refreshToken)
  }
}
