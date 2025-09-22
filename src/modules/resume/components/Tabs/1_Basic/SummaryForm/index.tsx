import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import GenerateBio from './Generate'
import Info from './Info'

import type { ResumeFormType } from '@/modules/resume/interface'

const SummaryForm: React.FC = () => {
  const t = useTranslations('form')
  const mainT = useTranslations('Resume.Basic')
  const form = useFormContext<ResumeFormType>()

  return (
    <div className="rounded-lg border border-muted bg-card">
      <div className="flex items-center justify-between border-b border-b-muted p-3 sm:p-4">
        <div>
          <h2 className="font-semibold text-md sm:text-lg">{mainT('SummaryTitle')}</h2>
          <p className="text-gray-400 text-xs sm:text-sm">{mainT('SummaryDescription')}</p>
        </div>

        <Info />
      </div>
      <div className="px-4 py-6">
        <div className="grid grid-cols-12 gap-x-3 gap-y-6">
          <div className="col-span-12">
            <div className="rounded-md border border-muted ring-primary focus-within:ring-1">
              <div className="flex items-center justify-between border-muted border-b p-2 py-4">
                <GenerateBio />
              </div>

              <FormField
                control={form.control}
                name="basic.summary"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="!ring-0 !ring-offset-0 !bg-transparent !outline-none border-none"
                        placeholder={t('resume.basic.summaryPlaceholder')}
                        size="sm"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryForm
