export interface PageLang {
  params: {
    locale: string
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
  pagination: MetaPagination
}

export interface MetaPagination {
  page: number
  orderBy: string
  perPage: number
  search: string
  total: number
  totalPage: number
  orderDirection: string
}
