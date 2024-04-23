import { setCookie } from 'cookies-next'

export const setUserToken = (token: string, refreshToken?: string) => {
  setCookie('accessToken', token)
  localStorage.setItem('accessToken', token)
  if (refreshToken) {
    setCookie('refreshToken', refreshToken)
    localStorage.setItem('refreshToken', refreshToken)
  }
}

export const removeUserToken = () => {
  setCookie('accessToken', '', { expires: new Date(0) })
  setCookie('refreshToken', '', { expires: new Date(0) })
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user-storage')
}
