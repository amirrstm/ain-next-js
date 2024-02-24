export interface PageLang {
  params: {
    lng: string
  }
}

export interface ResponseModel<T> {
  data: T
  message?: string
  statusCode: number
  _metadata: ResponseMeta
}

export interface ResponseMeta {
  path: string
  version: string
  timezone: string
  requestId: string
  timestamp: number
  repoVersion: string
  languages: string[]
}
