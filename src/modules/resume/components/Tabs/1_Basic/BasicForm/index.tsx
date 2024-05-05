import { useTranslations } from 'next-intl'

import { useFormContext } from 'react-hook-form'

import { DatePicker } from '@/components/ui/date-picker'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ReactSelect } from '@/components/ui/react-select'

import { useConstants } from '@/modules/resume/hooks/useConstants'
import { ResumeFormType } from '@/modules/resume/interface'

import OccupationSelect from '../../../Common/OccupationSelect'

const BasicForm: React.FC = () => {
  const t = useTranslations('form')
  const { genders, marriage, military } = useConstants()
  const form = useFormContext<ResumeFormType>()

  return (
    <div className="grid grid-cols-12 gap-x-3 gap-y-6">
      <div className="col-span-6 sm:col-span-4">
        <FormField
          name="basic.firstName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.firstName')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-4">
        <FormField
          name="basic.lastName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.lastName')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12 sm:col-span-4">
        <FormField
          name="basic.label"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.label')}</FormLabel>
              <FormControl>
                <OccupationSelect
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  placeholder={t('resume.basic.labelPlaceholder')}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-2">
        <FormField
          name="basic.gender"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.gender')}</FormLabel>
              <FormControl>
                <ReactSelect size="sm" options={genders} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-2">
        <FormField
          name="basic.marriage"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.marriage')}</FormLabel>
              <FormControl>
                <ReactSelect size="sm" options={marriage} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-4">
        <FormField
          name="basic.military"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.military')}</FormLabel>
              <FormControl>
                <ReactSelect size="sm" options={military} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-4">
        <FormField
          name="basic.birthDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.birth')}</FormLabel>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default BasicForm
