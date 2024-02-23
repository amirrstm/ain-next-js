export interface PageLang {
  params: {
    lng: string
  }
}

export interface ResponseModel<T> {
  data: T[]
  message?: string
  meta: ResponseMeta
  link: ResponseLinksModel
}

export interface ResponseLinksModel {
  prev: string
  last: string
  next: string
  first: string
}

export interface ResponseMeta {
  to: number
  from: number
  total: number
  per_page: number
  last_page: number
  current_page: number

  path: string
  routeName: string
  savedFilters: string[]
  exportColumns: string[]
  orderByColumns: string[]
  filters: Record<string, string>
  filterLinks: Record<string, string>
  links: { url: string; label: string; active: boolean }[]
}

export interface FilterColumns {
  key: string
  type: string
  label: string
  isSelect: boolean
  selectUrl?: string
}
