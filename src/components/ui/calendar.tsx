'use client'

import clsx from 'clsx'
import { format } from 'date-fns'
import { de, enUS } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import { buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  hasTime,
  ...props
}: CalendarProps & { hasTime?: boolean }) {
  const [timeValue, setTimeValue] = React.useState<string>('00:00')

  React.useEffect(() => {
    if (props.selected && hasTime) {
      setTimeValue(format(props.selected as Date, 'HH:mm'))
    }
  }, [props.selected, hasTime])

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const time = e.target.value
    const selected = props.selected as Date

    if (!selected) {
      setTimeValue(time)
      return
    }

    const [hours, minutes] = time.split(':').map(str => parseInt(str, 10))
    const newSelectedDate = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate(), hours, minutes)

    if (props.mode === 'single' && props.onSelect) {
      setTimeValue(time)
      // @ts-ignore
      props.onSelect(newSelectedDate)
    }
  }

  return (
    <DayPicker
      captionLayout="dropdown-buttons"
      showOutsideDays={showOutsideDays}
      className={cn('!m-0 p-3', className)}
      classNames={{
        month: 'space-y-4',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(buttonVariants({ variant: 'ghost' }), 'h-9 w-9 p-0 font-normal aria-selected:opacity-100'),
        day_selected:
          'bg-primary text-primary-foreground hover:!bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      footer={
        !hasTime ? undefined : (
          <div className="p-3 items-center flex gap-3">
            Pick a time:{' '}
            <input type="time" value={timeValue} className="border p-1 rounded-sm flex-1" onChange={handleTimeChange} />
          </div>
        )
      }
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
