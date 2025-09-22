'use client'

import { useParams } from 'next/navigation'

import FaqEN from './En'
import FaqFa from './Fa'

import type React from 'react'

const Faq: React.FC = () => {
  const { locale } = useParams()

  return locale === 'fa' ? <FaqFa /> : <FaqEN />
}

export default Faq
