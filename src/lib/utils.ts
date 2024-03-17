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
  equation = equation.replace(textRegex, function (match, p1) {
    return '<b>' + p1 + '</b>'
  })
  equation = equation.replace(/\\\[|\\\]|\\\(|\\\)|\\\{\\\}/g, '')
  equation = equation.replace(/\\times/g, '×')
  equation = equation.replace(/\\times/g, '×')
  equation = equation.replace(/\\cdot/g, '.')
  equation = equation.replace(/\\theta/g, 'θ')
  equation = equation.replace(/\\mu/g, 'μ')
  equation = equation.replace(/\\Delta/g, '∆')
  equation = equation.replace(/\\oint/g, '&int;')
  equation = equation.replace(/\\leq\s*([^$]+)/g, function (match, value) {
    return '&leq; ' + value
  })

  equation = equation.replace(subRegex, function (match, base, subscript, exponent) {
    var result = base
    if (subscript) {
      result += '<sub>' + subscript + '</sub>'
    }
    if (exponent) {
      result += '<sup>' + exponent + '</sup>'
    }
    return result
  })

  equation = equation.replace(trigRegex, function (match, func, arg) {
    return "<span style='font-family: serif;'>" + func + ' (' + arg + ') </span>'
  })

  equation = equation.replace(powerRegex, function (match, base, exponent) {
    return base + '<sup>' + exponent + '</sup>'
  })
  equation = equation.replace(powerNumRegex, function (match, base, exponent) {
    return '<span dir="ltr">' + base + '<sup>' + exponent + '</sup>' + '</span>'
  })
  equation = equation.replace(minusPowerRegex, function (match, base, exponent) {
    return '<span dir="ltr">' + base + '<sup>' + exponent + '</sup>' + '</span>'
  })

  equation = equation.replace(minusPowerParRegex, function (match, base, exponent) {
    return +base + '<sup>' + exponent + '</sup>'
  })

  equation = equation.replace(/\\?\s*\\?,\s*(.)/, '$1')

  equation = equation.replace(fracRegex, function (match, numerator, denominator) {
    return (
      "<div style='display:inline-block;vertical-align:middle;text-align:center; margin-right:10px;margin-left:10px;'><div style='display:block;'>" +
      numerator +
      "</div><div style='border-top:1px solid #a0a0a0;display:block;padding-top:0.1em;margin-top:-0.1em;'>" +
      denominator +
      '</div></div>'
    )
  })
  equation = equation.replace(sqrtRegex, function (match, value) {
    return "&radic;<span style='border-top:1px solid black'>" + value + '</span>'
  })

  equation = equation.replace('\\,', '')

  return equation
}
