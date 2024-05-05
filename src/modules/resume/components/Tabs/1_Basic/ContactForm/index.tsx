import { useTranslations } from 'next-intl'

import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MobileInput } from '@/components/ui/mobile-input'

import { ResumeFormType } from '@/modules/resume/interface'

import LocationForm from '../../../Common/LocationForm'

const ContactForm: React.FC = () => {
  const t = useTranslations('form')
  const form = useFormContext<ResumeFormType>()

  return (
    <div className="grid grid-cols-12 gap-x-3 gap-y-6">
      <div className="col-span-12 sm:col-span-4">
        <FormField
          name="basic.email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.email')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" dir="ltr" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12 sm:col-span-4">
        <FormField
          name="basic.phone"
          control={form.control}
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
          name="basic.url"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.url')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" dir="ltr" placeholder="WWW" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <LocationForm
        control={form.control}
        name={`basic.location`}
        cityClassName="col-span-12 sm:col-span-4"
        stateClassName="col-span-12 sm:col-span-4"
        countryClassName="col-span-12 sm:col-span-4"
      />

      <div className="col-span-12">
        <FormField
          name="basic.location.address"
          control={form.control}
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
