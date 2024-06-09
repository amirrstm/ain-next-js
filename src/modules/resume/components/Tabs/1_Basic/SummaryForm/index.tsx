import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import { ResumeFormType } from '@/modules/resume/interface'

import GenerateBio from './Generate'
import Info from './Info'

const SummaryForm: React.FC = () => {
  const { resumeId } = useParams()
  const t = useTranslations('form')
  const mainT = useTranslations('Resume.Basic')
  const form = useFormContext<ResumeFormType>()

  return (
    <div className="bg-card rounded-lg border border-muted">
      <div className="p-3 sm:p-4 border-b border-b-muted flex items-center justify-between">
        <div>
          <h2 className="text-md sm:text-lg font-semibold">{mainT('SummaryTitle')}</h2>
          <p className="text-xs sm:text-sm text-gray-400">{mainT('SummaryDescription')}</p>
        </div>

        <Info />
      </div>
      <div className="py-6 px-4">
        <div className="grid grid-cols-12 gap-x-3 gap-y-6">
          <div className="col-span-12 ">
            <div className="border border-muted rounded-md ring-primary focus-within:ring-1">
              <div className="p-2 py-4 border-b border-muted flex items-center justify-between">
                <GenerateBio />
              </div>

              <FormField
                name="basic.summary"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        size="sm"
                        placeholder={t('resume.basic.summaryPlaceholder')}
                        className="!ring-0 !ring-offset-0 border-none !bg-transparent !outline-none"
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
