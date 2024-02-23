/* eslint-disable */
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import i18next from 'i18next'

import ENDPOINTS from './Endpoints'

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
    config.headers['X-PANEL'] = false
    config.headers['HTTP_ACCEPT_LANGUAGE'] = i18next.language ?? 'de'

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
    const messages = []
    let errorMessage = ''
    const allErrors = error.response?.data as any
    const isError422 = error.response?.status === 422
    const isError400 = error.response?.status === 400
    const isError403 = error.response?.status === 403

    if (isError403) {
      errorMessage = allErrors?.message
    }

    if (isError400) {
      errorMessage = 'Bad Request'
      for (const errKey in allErrors) {
        const errorMessage = allErrors[errKey].message

        if (errorMessage) {
          messages.push(allErrors[errKey].message)
        } else {
          messages.push(allErrors[errKey])
        }
      }
    }

    if (isError422) {
      errorMessage = 'Unprocessable Content'
      const errorsFromResponse = error.response?.data as any

      for (const key in errorsFromResponse) {
        const isErrorMessageValid = !!errorsFromResponse[key].message

        if (isErrorMessageValid) {
          messages.push(errorsFromResponse[key].message)
        } else {
          errorsFromResponse[key].forEach((message: string) => {
            messages.push(message)
          })
        }
      }
    }

    throw { error: errorMessage, status: error.response?.status, messages }
  } else {
    throw { error: 'Network Error', status: error.response?.status }
  }
}

AxiosClient.interceptors.request.use(axiosRequestMiddleware)
AxiosClient.interceptors.response.use(axiosResponseMiddleware, axiosErrorMiddleware)

export default AxiosClient
