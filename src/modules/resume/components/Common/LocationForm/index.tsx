import clsx, { type ClassValue } from 'clsx'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import React from 'react'
import { type Control, type FieldValues, useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ReactSelect } from '@/components/ui/react-select'
import { COUNTRY_LABELED } from '@/constants/country-codes'
import useProvinces from '@/modules/resume/hooks/useProvinces'

import type { ResumeFormType } from '@/modules/resume/interface'

interface Props {
  name: string
  control: Control<FieldValues>

  stateClassName?: ClassValue
  cityClassName?: ClassValue
  countryClassName?: ClassValue
}

const LocationForm: React.FC<Props> = ({ control, name, cityClassName, countryClassName, stateClassName }) => {
  const { locale } = useParams()
  const t = useTranslations('form')
  const { data, isLoading } = useProvinces()
  const form = useFormContext<ResumeFormType>()

  const [cities, setCities] = React.useState<{ label: string; value: string }[]>([])
  const [isIran, setIsIran] = React.useState(
    form.getValues(`${name}.country`) === 'ایران' || form.getValues(`${name}.country`) === 'Iran'
  )

  const onSearchCountry = (
    option: { data: { label: string; value: string; dial_code: string; name: string } } | unknown,
    searchText: string
  ) => {
    if (!searchText) return true

    return (
      option.data.label.toLowerCase().includes(searchText.toLowerCase()) ||
      option.data.value.toLowerCase().includes(searchText.toLowerCase()) ||
      option.data.dial_code.toLowerCase().includes(searchText.toLowerCase()) ||
      option.data.name.toLowerCase().includes(searchText.toLowerCase())
    )
  }

  const onSelectCountry = (value: { code: string }) => {
    setIsIran(value.code === 'IR')
    form.setValue(`${name}.city`, '')
    form.setValue(`${name}.state`, '')
  }

  const onSelectState = (value: { label: string }) => {
    if (value?.label) {
      const province = data?.find((p) => p.name === value.label)
      setCities(
        province?.cities.map((c) => ({ label: c.name, value: c.name })).sort((a, b) => a.label.localeCompare(b.label)) || []
      )
    } else {
      setCities([])
      form.setValue(`${name}.city`, '')
    }
  }

  return (
    <>
      <div className={clsx(countryClassName)}>
        <FormField
          control={control}
          name={`${name}.country`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.location.country')}</FormLabel>
              <FormControl>
                <ReactSelect
                  filterOption={onSearchCountry}
                  isLoading={isLoading}
                  onSelect={onSelectCountry}
                  options={COUNTRY_LABELED(locale as string)}
                  size="sm"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className={clsx(stateClassName)}>
        <FormField
          control={control}
          name={`${name}.state`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.location.state')}</FormLabel>
              <FormControl>
                {isIran ? (
                  <ReactSelect
                    isClearable
                    isLoading={isLoading}
                    onSelect={onSelectState}
                    options={data?.map((p) => ({ label: p.name, value: p.name }))}
                    placeholder={t('resume.location.state')}
                    size="sm"
                    {...field}
                  />
                ) : (
                  <Input {...field} inputSize="sm" placeholder={t('resume.location.state')} />
                )}
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className={clsx(cityClassName)}>
        <FormField
          control={control}
          name={`${name}.city`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.location.city')}</FormLabel>
              <FormControl>
                {isIran ? (
                  <ReactSelect
                    isDisabled={cities.length === 0}
                    options={cities}
                    placeholder={t('resume.location.city')}
                    size="sm"
                    {...field}
                  />
                ) : (
                  <Input {...field} inputSize="sm" placeholder={t('resume.location.city')} />
                )}
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}

export default LocationForm
