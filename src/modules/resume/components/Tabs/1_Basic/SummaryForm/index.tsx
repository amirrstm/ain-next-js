import { useTranslations } from 'next-intl'

import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import { ResumeFormType } from '@/modules/resume/interface'

const SummaryForm: React.FC = () => {
  const t = useTranslations('form')
  const form = useFormContext<ResumeFormType>()

  return (
    <div className="grid grid-cols-12 gap-x-3 gap-y-6">
      <div className="col-span-12 ">
        <FormField
          name="basic.summary"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.summary')}</FormLabel>
              <FormControl>
                <Textarea {...field} size="sm" placeholder={t('resume.basic.summaryPlaceholder')} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default SummaryForm
