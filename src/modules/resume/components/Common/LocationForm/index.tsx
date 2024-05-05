import { useTranslations } from 'next-intl'

import clsx, { ClassValue } from 'clsx'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ReactSelect } from '@/components/ui/react-select'

import { COUNTRY_LABELED } from '@/constants/country-codes'
import useProvinces from '@/modules/resume/hooks/useProvinces'
import { ResumeFormType } from '@/modules/resume/interface'

interface Props {
  name: any
  control: any

  stateClassName?: ClassValue
  cityClassName?: ClassValue
  countryClassName?: ClassValue
}

const LocationForm: React.FC<Props> = ({ control, name, cityClassName, countryClassName, stateClassName }) => {
  const t = useTranslations('form')
  const { data, isLoading } = useProvinces()
  const form = useFormContext<ResumeFormType>()

  const [cities, setCities] = React.useState<any[]>([])
  const [isIran, setIsIran] = React.useState(form.getValues(`${name}.country` as any) === 'ایران')

  const onSearchCountry = (option: any, searchText: string) => {
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
    form.setValue(`${name}.city` as any, '')
    form.setValue(`${name}.state` as any, '')
  }

  const onSelectState = (value: { label: string }) => {
    if (value && value.label) {
      const province = data?.find(p => p.name === value.label)
      setCities(province?.cities.map(c => ({ label: c.name, value: c.name })) || [])
    } else {
      setCities([])
      form.setValue(`${name}.city` as any, '')
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
                  size="sm"
                  isLoading={isLoading}
                  options={COUNTRY_LABELED}
                  onSelect={onSelectCountry}
                  filterOption={onSearchCountry}
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
                    size="sm"
                    isClearable
                    isLoading={isLoading}
                    onSelect={onSelectState}
                    placeholder={t('resume.location.state')}
                    options={data?.map(p => ({ label: p.name, value: p.name }))}
                    {...field}
                  />
                ) : (
                  <Input {...field} placeholder={t('resume.location.state')} inputSize="sm" />
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
                    size="sm"
                    options={cities}
                    isDisabled={cities.length === 0}
                    placeholder={t('resume.location.city')}
                    {...field}
                  />
                ) : (
                  <Input {...field} placeholder={t('resume.location.city')} inputSize="sm" />
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
