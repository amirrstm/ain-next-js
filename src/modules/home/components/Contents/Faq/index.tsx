'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import FaqEN from './En'
import FaqFa from './Fa'

const Faq: React.FC = () => {
  const { locale } = useParams()

  return locale === 'fa' ? <FaqFa /> : <FaqEN />
}

export default Faq
