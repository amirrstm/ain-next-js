'use client'

import { useParams } from 'next/navigation'

import { IconCalendar } from '@tabler/icons-react'
import clsx from 'clsx'
import dayjs from 'dayjs'
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant={'outline'}
          className={cn(
            locale === 'fa' && YekanBakhNumFont.className,
            !date && 'text-muted-foreground',
            'w-full justify-start select-none h-8',
            'bg-card dark:text-white dark:placeholder-text-[#d9d9d9] dark:ring-offset-card dark:border-input',
          )}
        >
          <IconCalendar className="me-2 h-4 w-4" />
          <span className="text-xs flex-1 text-start">
            {locale === 'fa'
              ? desiredDate(date).locale('fa').format('D MMMM YYYY')
              : desiredDate(date).locale('en').format('YYYY-MM-DD')}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(locale === 'fa' && YekanBakhNumFont.className, 'w-auto p-0 !left-0')}
        align="end"
        asChild
      >
        <div className="w-[250px] rounded-2xl overflow-hidden">
          <CalendarProvider locale={locale as 'en' | 'fa'} round="x2" accentColor="#6374ae">
            <ZamanCalendar
              defaultValue={date}
              weekends={locale === 'fa' ? [6] : []}
              className={clsx(
                '[&_.item_div]:justify-end rtl:[&_.item_div]:justify-start',
                '!border-none !rounded-none dark:!bg-card dark:[&_.zm-DaysButton]:text-white dark:[&_.zm-Header]:bg-card',
                '[&_.zm-IconNextButton]:!bg-transparent [&_.zm-IconPrevButton]:!bg-transparent dark:[&_.zm-Header]:border-b-neutral-500 [&_.zm-Header]:border-b',
              )}
              onChange={({ value }) => {
                setDate(value)
                onChange?.(value)

                setOpen(false)
              }}
            />
          </CalendarProvider>
        </div>
      </PopoverContent>
    </Popover>
  )
})
DatePicker.displayName = 'DatePicker'

export { DatePicker }
