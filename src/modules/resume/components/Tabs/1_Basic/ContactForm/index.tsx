import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MobileInput } from '@/components/ui/mobile-input'

import LocationForm from '../../../Common/LocationForm'

import type { ResumeFormType } from '@/modules/resume/interface'

const ContactForm: React.FC = () => {
  const t = useTranslations('form')
  const form = useFormContext<ResumeFormType>()

  return (
    <div className="grid grid-cols-12 gap-x-3 gap-y-6">
      <div className="col-span-12 sm:col-span-4">
        <FormField
          control={form.control}
          name="basic.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.email')}</FormLabel>
              <FormControl>
                <Input {...field} dir="ltr" inputSize="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12 sm:col-span-4">
        <FormField
          control={form.control}
          name="basic.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.mobile')}</FormLabel>
              <FormControl>
                <MobileInput {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12 sm:col-span-4">
        <FormField
          control={form.control}
          name="basic.url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.url')}</FormLabel>
              <FormControl>
                <Input {...field} dir="ltr" inputSize="sm" placeholder="WWW" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <LocationForm
        cityClassName="col-span-12 sm:col-span-4"
        control={form.control}
        countryClassName="col-span-12 sm:col-span-4"
        name={`basic.location`}
        stateClassName="col-span-12 sm:col-span-4"
      />

      <div className="col-span-12">
        <FormField
          control={form.control}
          name="basic.location.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.location.address')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default ContactForm
