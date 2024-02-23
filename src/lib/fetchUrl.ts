import { cookies } from 'next/headers'

import i18next from 'i18next'

export default async function fetchWithUrl<P>(input: RequestInfo, init?: RequestInit): Promise<P> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}${input}`, {
      ...init,
      headers: cookies().get('token')?.value
        ? {
            'Content-Type': 'application/json',
            HTTP_ACCEPT_LANGUAGE: i18next.language ?? 'de',
            Authorization: `Bearer ${cookies().get('token')?.value}`,
          }
        : { 'Content-Type': 'application/json', HTTP_ACCEPT_LANGUAGE: i18next.language ?? 'de' },
    })

    const data = await response.json()

    if (response.ok) {
      return data
    }

    throw new FetchError({ message: response.statusText, response, data })
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export class FetchError extends Error {
  response: Response
  data: {
    message: string
  }
  constructor({
    message,
    response,
    data,
  }: {
    message: string
    response: Response
    data: {
      message: string
    }
  }) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError)
    }

    this.name = 'FetchError'
    this.response = response
    this.data = data ?? { message: message }
  }
}
