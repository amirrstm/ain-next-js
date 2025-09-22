'use client'

import { IconCalendar } from '@tabler/icons-react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import 'dayjs/locale/fa'
import jalaliday from 'jalaliday'
import * as React from 'react'
import { CalendarProvider, Calendar as ZamanCalendar } from 'zaman'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { YekanBakhNumFont } from '@/styles/fonts'

const jalali = (date?: Date) => dayjs(date).calendar('jalali')
dayjs.extend(jalaliday)

interface Props {
  value?: Date
  onChange?: (date: Date) => void
}

const DatePicker = React.forwardRef<HTMLButtonElement, Props>(({ value, onChange }, ref) => {
  const { locale } = useParams()
  const desiredDate = locale === 'fa' ? jalali : dayjs

  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date>()

  React.useEffect(() => {
    if (value) {
      setDate(value)
    }
  }, [value])

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            locale === 'fa' && YekanBakhNumFont.className,
            !date && 'text-muted-foreground',
            'h-8 w-full select-none justify-start',
            'bg-card dark:border-input dark:text-white dark:placeholder-text-[#d9d9d9] dark:ring-offset-card'
          )}
          ref={ref}
          variant={'outline'}
        >
          <IconCalendar className="me-2 h-4 w-4" />
          <span className="flex-1 text-start text-xs">
            {locale === 'fa'
              ? desiredDate(date).locale('fa').format('D MMMM YYYY')
              : desiredDate(date).locale('en').format('YYYY-MM-DD')}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" asChild className={cn(locale === 'fa' && YekanBakhNumFont.className, '!left-0 w-auto p-0')}>
        <div className="w-[250px] overflow-hidden rounded-2xl">
          <CalendarProvider accentColor="#6374ae" locale={locale as 'en' | 'fa'} round="x2">
            <ZamanCalendar
              className={clsx(
                '[&_.item_div]:justify-end rtl:[&_.item_div]:justify-start',
                '!border-none !rounded-none dark:!bg-card dark:[&_.zm-DaysButton]:text-white dark:[&_.zm-Header]:bg-card',
                '[&_.zm-IconNextButton]:!bg-transparent [&_.zm-IconPrevButton]:!bg-transparent [&_.zm-Header]:border-b dark:[&_.zm-Header]:border-b-neutral-500'
              )}
              defaultValue={date}
              onChange={({ value }) => {
                setDate(value)
                onChange?.(value)

                setOpen(false)
              }}
              weekends={locale === 'fa' ? [6] : []}
            />
          </CalendarProvider>
        </div>
      </PopoverContent>
    </Popover>
  )
})
DatePicker.displayName = 'DatePicker'

export { DatePicker }
