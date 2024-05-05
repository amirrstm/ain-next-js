'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWRMutation from 'swr/mutation'
import * as z from 'zod'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'

import API from '@/lib/api'
import useUserStore from '@/lib/store/auth'
import { useI18nZodErrors } from '@/lib/zodValidation'
import { updateName } from '@/modules/auth/services'

const formSchema = z.object({ firstName: z.string().min(1), lastName: z.string().min(1) })

const AppSettings: React.FC = () => {
  useI18nZodErrors('auth')
  const { toast } = useToast()
  const t = useTranslations('User')
  const { theme, setTheme } = useTheme()

  const onChangeTheme = (value: string) => {
    setTheme(value)
  }

  return (
    <div className="border border-muted rounded-xl bg-background">
      <div className="border-b border-b-muted p-4">
        <span className="text-lg">{t('Settings.AppSettings')}</span>
      </div>

      <div className="p-4 grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <p className="mb-2 text-gray-400">{t('Settings.Theme')}</p>
          <RadioGroup defaultValue={theme} className="flex gap-6" dir="rtl" onValueChange={onChangeTheme}>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark">{t('Settings.DarkMode')}</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light">{t('Settings.LightMode')}</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system">{t('Settings.SystemMode')}</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default AppSettings
