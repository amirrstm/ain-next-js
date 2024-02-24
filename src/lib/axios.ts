/* eslint-disable */
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import i18next from 'i18next'

const REQUEST_TIMEOUT = 1000 * 60 * 5 // 5 Minutes

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
    config.headers['x-custom-lang'] = i18next.language ?? 'de'

    const latestToken = localStorage.getItem('token')
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

function axiosErrorMiddleware(error: AxiosError) {
  const isErrorResponseValid = !!error.response

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
