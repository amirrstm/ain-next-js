import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import axios from '@/lib/axios'

import type { Theme } from 'react-select'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl(url: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_ENDPOINT}${url}`
}

export function serverObjectsSanitizer<T>(input: T, ignoreList: string[]): T {
  if (Array.isArray(input)) {
    return input.map((i) => serverObjectsSanitizer(i, ignoreList)) as unknown as T
  }

  if (typeof input === 'object' && input != null) {
    return Object.keys(input).reduce((t, c) => {
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
    baseUnit: 2.4,
    controlHeight: 22
  }
})

export const uploadFile = async (uploadFile: File) => {
  const formData = new FormData()
  formData.append('file', uploadFile)

  const response = await axios.post('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
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

export const getBlobDuration = async (blob: Blob): Promise<number> => {
  const tempVideoEl: HTMLVideoElement = document.createElement('video')

  const durationP = new Promise((resolve, reject: (error: unknown) => void) => {
    tempVideoEl.addEventListener('loadedmetadata', () => {
      if (tempVideoEl.duration === Infinity) {
        tempVideoEl.currentTime = Number.MAX_SAFE_INTEGER
        tempVideoEl.ontimeupdate = () => {
          tempVideoEl.ontimeupdate = null
          resolve(tempVideoEl.duration)
          tempVideoEl.currentTime = 0
        }
      } else resolve(tempVideoEl.duration)
    })
    tempVideoEl.onerror = function (this: HTMLVideoElement) {
      if (this.error) {
        reject(this.error)
      }
    }
  })

  tempVideoEl.src =
    typeof blob === 'string' || blob instanceof String
      ? (blob as unknown as string)
      : (window.URL.createObjectURL(blob) as string)

  return durationP as Promise<number>
}

export const displayEquation = (equation: string) => {
  const powerRegex = /(\w+)\^(\d+)/g
  const subRegex = /(.+?)_([^_^]+?)(?:\^(.+?))?/g
  const powerNumRegex = /(\d+|\([^)]+\))\s*\^\s*(\d+)/g
  const minusPowerRegex = /(\d+)\^\{(-?\d+)\}/g
  const minusPowerParRegex = /(\d+)\^\((-?\d+)\)/g
  const textRegex = /\\, \\text\{([^}]+)\}/g
  const trigRegex = /\\?(cos|sin|tan|cot)\(([^)]+)\)/g
  const fracRegex = /\\frac\{([^}]+)\}\{([^}]+)\}/g
  const sqrtRegex = /\\sqrt\{([^}]+)\}/g
  const formulaRegex = /^\\?\[.+\]$/

  equation = equation.replace(formulaRegex, `<div dir="ltr">${equation}</div>`)
  equation = equation.replace(textRegex, (_match, p1) => `<b>${p1}</b>`)
  equation = equation.replace(/\\\[|\\\]|\\\(|\\\)|\\\{\\\}/g, '')
  equation = equation.replace(/\\times/g, '×')
  equation = equation.replace(/\\times/g, '×')
  equation = equation.replace(/\\cdot/g, '.')
  equation = equation.replace(/\\theta/g, 'θ')
  equation = equation.replace(/\\mu/g, 'μ')
  equation = equation.replace(/\\Delta/g, '∆')
  equation = equation.replace(/\\oint/g, '&int;')
  equation = equation.replace(/\\leq\s*([^$]+)/g, (_match, value) => `&leq; ${value}`)

  equation = equation.replace(subRegex, (_match, base, subscript, exponent) => {
    let result = base
    if (subscript) {
      result += `<sub>${subscript}</sub>`
    }
    if (exponent) {
      result += `<sup>${exponent}</sup>`
    }
    return result
  })

  equation = equation.replace(trigRegex, (_match, func, arg) => `<span style='font-family: serif;'>${func} (${arg}) </span>`)

  equation = equation.replace(powerRegex, (_match, base, exponent) => `${base}<sup>${exponent}</sup>`)
  equation = equation.replace(powerNumRegex, (_match, base, exponent) => `<span dir="ltr">${base}<sup>${exponent}</sup></span>`)
  equation = equation.replace(minusPowerRegex, (_match, base, exponent) => `<span dir="ltr">${base}<sup>${exponent}</sup></span>`)

  equation = equation.replace(minusPowerParRegex, (_match, base, exponent) => `${+base}<sup>${exponent}</sup>`)

  equation = equation.replace(/\\?\s*\\?,\s*(.)/, '$1')

  equation = equation.replace(
    fracRegex,
    (_match, numerator, denominator) =>
      "<div style='display:inline-block;vertical-align:middle;text-align:center; margin-right:10px;margin-left:10px;'><div style='display:block;'>" +
      numerator +
      "</div><div style='border-top:1px solid #a0a0a0;display:block;padding-top:0.1em;margin-top:-0.1em;'>" +
      denominator +
      '</div></div>'
  )
  equation = equation.replace(sqrtRegex, (_match, value) => `&radic;<span style='border-top:1px solid black'>${value}</span>`)

  equation = equation.replace('\\,', '')

  return equation
}
