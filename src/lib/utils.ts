import { type ClassValue, clsx } from 'clsx'
import { Theme } from 'react-select'
import { twMerge } from 'tailwind-merge'

import axios from '@/lib/axios'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl(url: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_ENDPOINT}${url}`
}

export function serverObjectsSanitizer<T>(input: T, ignoreList: string[]): T {
  if (Array.isArray(input)) {
    return input.map(i => serverObjectsSanitizer(i, ignoreList)) as unknown as T
  }

  if (typeof input === 'object' && input != null) {
    return Object.keys(input).reduce((t: any, c) => {
      const before = input[c as keyof T]
      if (ignoreList.indexOf(c) > -1) {
        delete t[c]
      } else {
        t[c] = serverObjectsSanitizer(before, ignoreList)
      }
      return t
    }, {}) as unknown as T
  }

  return input as unknown as T
}

export function findNestedObject<T>(entireObj: unknown[], keyToFind: string, valToFind: unknown): T {
  let foundObj: T = {} as T
  JSON.stringify(entireObj, (_, nestedValue) => {
    if (nestedValue && nestedValue[keyToFind] === valToFind) {
      foundObj = nestedValue
    }
    return nestedValue
  })
  return foundObj
}

export const reactSelectTheme = (theme: Theme): Theme => ({
  ...theme,
  spacing: {
    ...theme.spacing,
    baseUnit: 2.7,
    controlHeight: 40,
  },
  colors: {
    ...theme.colors,
    primary: '#496482',
    neutral50: '#d9d9d9',
    neutral0: '#fff',
    neutral20: '#d9d9d9',
    neutral80: '#141414',
  },
})

export const uploadFile = async (uploadFile: File) => {
  const formData = new FormData()
  formData.append('file', uploadFile)

  const response = await axios.post('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data.data
}

export const persianToEnglishNumbers = (input: string): string => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  let output = ''

  for (let i = 0; i < input.length; i++) {
    const index = persianNumbers.indexOf(input[i])
    output += index !== -1 ? englishNumbers[index] : input[i]
  }

  return output
}
