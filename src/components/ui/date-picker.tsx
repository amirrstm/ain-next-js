'use client'

import { IconCalendar } from '@tabler/icons-react'
import dayjs from 'dayjs'
import 'dayjs/locale/fa'
import jalaliday from 'jalaliday'
import * as React from 'react'
import { Calendar, CalendarProvider } from 'zaman'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'
import { YekanBakhNumFont } from '@/styles/fonts'

dayjs.locale('fa')
dayjs.extend(jalaliday)

const jalali = (date?: Date) => dayjs(date).calendar('jalali')

interface Props {
  value?: Date
  onChange?: (date: Date) => void
}

const DatePicker = React.forwardRef<HTMLButtonElement, Props>(({ value, onChange }, ref) => {
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
            YekanBakhNumFont.className,
            !date && 'text-muted-foreground',
            'w-full justify-start select-none h-8',
            'dark:bg-card dark:text-white dark:placeholder-text-[#d9d9d9] dark:ring-offset-card dark:border-input',
          )}
        >
          <IconCalendar className="me-2 h-4 w-4" />
          <span className="text-xs flex-1 text-right">{jalali(date).format('D MMMM YYYY')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(YekanBakhNumFont.className, 'w-auto p-0 !left-0')} align="end" asChild>
        <div className="w-[240px] rounded-2xl overflow-hidden">
          <CalendarProvider locale="fa" round="x2" accentColor="#6374ae">
            <Calendar
              weekends={[6]}
              defaultValue={date}
              className="!border-none !rounded-none dark:!bg-card dark:[&_.zm-DaysButton]:text-white dark:[&_.zm-Header]:bg-card"
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
