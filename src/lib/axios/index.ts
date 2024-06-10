/* eslint-disable */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { refreshAccessToken } from '@/modules/auth/services'

import API from '../api'

const REQUEST_TIMEOUT = 1000 * 60 * 5 // 5 Minutes
const NO_ERROR_REQUESTS = [API.DATA.OCCUPATIONS]

const getAxiosClient = () =>
  axios.create({
    timeout: REQUEST_TIMEOUT,
    headers: { 'Content-Type': 'application/json' },
    baseURL: process.env.NEXT_PUBLIC_API_BASE_ENDPOINT,
  })

const AxiosClient = getAxiosClient()

// Request Config
const axiosRequestMiddleware = (config: InternalAxiosRequestConfig) => {
  config.baseURL = process.env.NEXT_PUBLIC_API_BASE_ENDPOINT

  if (config.headers) {
    config.headers['X-CUSTOM-LANG'] = localStorage.getItem('lang') ?? 'fa'

    const latestToken = config.url?.includes('/auth/user/refresh')
      ? localStorage.getItem('refreshToken')
      : localStorage.getItem('accessToken')
    if (latestToken) {
      config.headers['Authorization'] = `Bearer ${latestToken}`
    }
  }

  return config
}

// Response Config
function axiosResponseMiddleware(response: AxiosResponse) {
  return response
}

async function axiosErrorMiddleware(error: AxiosError) {
  const isErrorResponseValid = !!error.response
  const statusCode = Object(error.response?.data).statusCode

  if (error.code === 'ERR_CANCELED' && NO_ERROR_REQUESTS.some(e => e === error.config?.url)) {
    throw error.code
  }

  if (statusCode === 5000 && error.response?.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken') as string

    if (refreshToken) {
      return await refreshAccessToken().then(() => AxiosClient.request(error.config as AxiosRequestConfig))
    }
  }

  if (isErrorResponseValid) {
    const messages: string[] = []
    const allErrors = error.response?.data as any
    const errorMessage = (error.response?.data as any)?.message ?? (error.response?.data as any)?.error ?? 'خطای شبکه'

    if (allErrors?.errors) {
      allErrors.errors.forEach((err: any) => {
        messages.push(err.message)
      })
    }

    throw { error: errorMessage, status: (error.response?.data as any)?.statusCode, messages }
  } else {
    throw { error: 'خطای شبکه', status: error.response?.status }
  }
}

AxiosClient.interceptors.request.use(axiosRequestMiddleware)
AxiosClient.interceptors.response.use(axiosResponseMiddleware, axiosErrorMiddleware)

export default AxiosClient
