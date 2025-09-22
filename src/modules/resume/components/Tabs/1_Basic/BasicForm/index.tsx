import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { DatePicker } from '@/components/ui/date-picker'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ReactSelect } from '@/components/ui/react-select'
import { useBasic } from '@/modules/resume/hooks/mutations'
import { useConstants } from '@/modules/resume/hooks/useConstants'

import OccupationSelect from '../../../Common/OccupationSelect'

import type { ResumeFormType } from '@/modules/resume/interface'

const BasicForm: React.FC = () => {
  const t = useTranslations('form')
  const form = useFormContext<ResumeFormType>()

  const { trigger: triggerBasic } = useBasic()
  const { genders, marriage, military } = useConstants()

  const onSelectOccupation = (occ: string) => {
    const basic = form.getValues('basic')
    triggerBasic({ ...basic, label: occ })
  }

  return (
    <div className="grid grid-cols-12 gap-x-3 gap-y-6">
      <div className="col-span-6 sm:col-span-4">
        <FormField
          control={form.control}
          name="basic.firstName"
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
          control={form.control}
          name="basic.lastName"
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
          control={form.control}
          name="basic.label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.label')}</FormLabel>
              <FormControl>
                <OccupationSelect
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  onSelect={onSelectOccupation}
                  placeholder={t('resume.basic.labelPlaceholder')}
                  value={field.value}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-2">
        <FormField
          control={form.control}
          name="basic.gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.gender')}</FormLabel>
              <FormControl>
                <ReactSelect options={genders} size="sm" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-2">
        <FormField
          control={form.control}
          name="basic.marriage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.marriage')}</FormLabel>
              <FormControl>
                <ReactSelect options={marriage} size="sm" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-4">
        <FormField
          control={form.control}
          name="basic.military"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.military')}</FormLabel>
              <FormControl>
                <ReactSelect options={military} size="sm" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-4">
        <FormField
          control={form.control}
          name="basic.birthDate"
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
