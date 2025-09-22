import { cookies } from 'next/headers'

export default async function fetchWithUrl<P>(input: RequestInfo, init?: RequestInit & { locale?: string }): Promise<P> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}${input}`, {
      ...init,
      headers: cookies().get('token')?.value
        ? {
            Authorization: `Bearer ${cookies().get('token')?.value}`,
            'Content-Type': 'application/json',
            'X-CUSTOM-LANG': init?.locale ?? 'fa'
          }
        : { 'Content-Type': 'application/json', 'X-CUSTOM-LANG': init?.locale ?? 'fa' }
    })

    const data = await response.json()

    if (response.ok) {
      return data
    }

    throw new FetchError({ data, message: response.statusText, response })
  } catch {
    throw new Error()
  }
}

export async function fetchWithoutCookie<P>(input: RequestInfo, init?: RequestInit): Promise<P> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}${input}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', 'X-CUSTOM-LANG': 'fa' }
    })

    const data = await response.json()

    if (response.ok) {
      return data
    }

    throw new FetchError({ data, message: response.statusText, response })
  } catch {
    throw new Error()
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
    data
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
