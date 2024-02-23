import { useParams } from 'next/navigation'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import Link from '@/components/ui/link'
import { useToast } from '@/components/ui/use-toast'

import { useTranslation } from '@/app/i18n/client'

import { subscribeUser } from '../services'

const isEmailValidRegex = (email: string) => {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

const NewsLetter: React.FC = () => {
  const { lng } = useParams()
  const { toast } = useToast()
  const { t } = useTranslation(lng as string, 'Layout')
  const [privacy, setPrivacy] = useState({ first: false, second: false, third: false })

  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const onSubscribe = () => {
    if (!email || !isEmailValidRegex(email)) {
      toast({ title: t('Footer.EmailValidation'), variant: 'destructive' })
      return
    }

    setLoading(true)
    subscribeUser(email)
      .then(() => {
        setLoading(false)
        toast({ title: t('Footer.NewsLetterSuccess'), variant: 'success' })
        setEmail('')
      })
      .catch(e => {
        if (Array.isArray(e.messages)) {
          e.messages.forEach((message: string) => {
            toast({ title: message, variant: 'destructive' })
          })
        }
        setLoading(false)
      })
  }

  return (
    <div className="bg-primary p-6 rounded-lg max-w-2xl mx-auto flex justify-center">
      <div>
        <h3 className="text-xl font-semibold text-white tracking-wider">{t('Footer.NewsLetterTitle')}</h3>
        <p className="text-gray-300">{t('Footer.NewsLetterSubtitle')}</p>

        <div className="flex w-full  items-center space-x-2 bg-white p-2 my-4 rounded-md">
          <Input
            type="email"
            value={email}
            className="border-none"
            onChange={e => setEmail(e.target.value)}
            placeholder={t('Footer.NewsLetterEmail')}
          />
          <Button
            loading={loading}
            onClick={onSubscribe}
            disabled={!privacy.first || !privacy.second || !privacy.third}
          >
            {t('Footer.Subscribe')}
          </Button>
        </div>

        <div className="text-white font-light text-lg space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="first_terms"
              className="border-white"
              checked={privacy.first}
              onCheckedChange={e => setPrivacy(prev => ({ ...prev, first: e as boolean }))}
            />
            <label htmlFor="first_terms" className="text-sm">
              Hiermit willige ich ein, den personalisierten Newsletter der Firma Solutions-Apps zu erhalten und dass mir
              die vorgenannte Firma Solutions-Apps an mich gerichtete Werbung zu ihren Produkten, Aktionen und
              Zufriedenheitsbefragungen zusenden darf. Diese Einwilligung kann ich jederzeit mit Wirkung für die Zukunft
              widerrufen.
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="second_terms"
              className="border-white"
              checked={privacy.second}
              onCheckedChange={e => setPrivacy(prev => ({ ...prev, second: e as boolean }))}
            />
            <label htmlFor="second_terms" className="text-sm">
              <span>
                Ich bin mit der Nutzung meiner Daten nach Maßgabe der in der{' '}
                <Link href="/legals/privacy_policy" lng={lng as string} className="underline underline-offset-2">
                  Datenschutzerklärung
                </Link>{' '}
                formulierten Einwilligungserklärung einverstanden.
              </span>
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="third_terms"
              className="border-white"
              checked={privacy.third}
              onCheckedChange={e => setPrivacy(prev => ({ ...prev, third: e as boolean }))}
            />
            <label htmlFor="third_terms" className="text-sm">
              <span>
                Ich bin mit der Übertragung meiner Daten zum Zwecke des Versendens des Newsletters in die USA nach
                Maßgabe der in der{' '}
                <Link href="/legals/privacy_policy" lng={lng as string} className="underline underline-offset-2">
                  Datenschutzerklärung
                </Link>{' '}
                formulierten Einwilligungserklärung einverstanden.
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter
