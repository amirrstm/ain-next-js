'use client'

import { IconCalendar, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import dayjs from 'dayjs'
import 'dayjs/locale/fa'
import jalaliday from 'jalaliday'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'
import { YekanBakhNumFont } from '@/styles/fonts'

dayjs.locale('fa')
dayjs.extend(jalaliday)

const jalali = (date?: Date) => dayjs(date).calendar('jalali')
const startingYear = jalali(new Date(1950, 1, 1)).startOf('y')

interface Props {
  value?: Date
  disabled?: boolean
  onChange?: (date: Date) => void
}

export const MonthPicker = React.forwardRef<HTMLButtonElement, Props>(
  ({ value = new Date(), disabled, onChange }, ref) => {
    const yearRef = React.useRef<HTMLDivElement>(null)
    const [open, setOpen] = React.useState(false)

    const [display, setDisplay] = React.useState<'year' | 'month'>('month')
    const [year, setYear] = React.useState<number>(jalali(value).year())
    const [month, setMonth] = React.useState<number>(jalali(value).month())

    const date = jalali().set('year', year).set('month', month).toDate()

    React.useEffect(() => {
      if (yearRef.current && display === 'year') {
        yearRef.current.scrollTop = yearRef.current.scrollHeight / 1.5
      }
    }, [display])

    const onForwardYear = () => {
      setYear(jalali(date).add(1, 'year').year())
    }

    const onBackwardYear = () => {
      setYear(jalali(date).subtract(1, 'year').year())
    }

    const onChangeDate = (comingDate: Date, isMonth?: boolean) => {
      let newDate = jalali()

      if (isMonth) {
        newDate = newDate.set('year', year)
        newDate = newDate.set('month', jalali(comingDate).month())
        setMonth(jalali(comingDate).month())
        setOpen(false)
      } else {
        newDate = newDate.set('year', jalali(comingDate).year())
        newDate = newDate.set('month', month)

        setYear(jalali(comingDate).year())
        setDisplay('month')
      }

      onChange?.(newDate.toDate())
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant={'outline'}
            className={cn(
              YekanBakhNumFont.className,
              !date && 'text-muted-foreground',
              'w-full justify-start select-none h-8',
              'bg-card dark:text-white dark:placeholder-text-[#d9d9d9] dark:ring-offset-card dark:border-input px-2',
            )}
          >
            <IconCalendar className="me-2 h-4 w-4" />
            <span className="flex-1 text-xs text-right line-clamp-1">
              {disabled ? 'تاریخ' : jalali(date).format('MMMM YYYY')}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn(YekanBakhNumFont.className, 'w-auto p-0')} align="start">
          <div className="w-[240px]">
            <div className="flex items-center justify-between p-2">
              <NavigateBtn onClick={onBackwardYear}>
                <IconChevronRight className="w-5 h-5" />
              </NavigateBtn>
              <div
                onClick={() => setDisplay(display === 'month' ? 'year' : 'month')}
                className="p-1 px-4 hover:bg-gray-100 hover:text-primary rounded-md cursor-pointer"
              >
                <span className="select-none">{year}</span>
              </div>
              <NavigateBtn onClick={onForwardYear}>
                <IconChevronLeft className="w-5 h-5" />
              </NavigateBtn>
            </div>

            {display === 'month' ? (
              <div className="grid grid-cols-3 gap-x-1 gap-y-4 px-2 py-4 border-t">
                {Array.from({ length: 12 }).map((_, i) => {
                  const innerMonth = jalali().startOf('y').add(i, 'month').toDate()

                  return (
                    <div
                      key={i}
                      onClick={() => onChangeDate(innerMonth, true)}
                      className={cn(
                        'p-1 text-center hover:bg-gray-100 hover:text-primary rounded-md cursor-pointer col-span-1 text-sm',
                        { 'bg-gray-100 text-primary': jalali(innerMonth).get('month') === jalali(date).get('month') },
                      )}
                    >
                      <span className="select-none">{jalali(innerMonth).format('MMMM')}</span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div
                ref={yearRef}
                className="grid grid-cols-3 gap-x-1 gap-y-4 px-2 py-4 border-t max-h-[200px] overflow-y-auto"
              >
                {Array.from({ length: 100 }).map((_, i) => {
                  const innerYear = startingYear.add(i, 'year').toDate()

                  return (
                    <div
                      key={i}
                      onClick={() => onChangeDate(innerYear)}
                      className={cn(
                        'p-1 text-center hover:bg-gray-100 hover:text-primary rounded-md cursor-pointer col-span-1 text-sm',
                        jalali(innerYear).isSame(date, 'year') && 'bg-gray-100 text-primary',
                      )}
                    >
                      <span className="select-none">{jalali(innerYear).format('YYYY')}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    )
  },
)

MonthPicker.displayName = 'MonthPicker'

const NavigateBtn: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <div
    onClick={onClick}
    className={cn(
      'bg-muted cursor-pointer w-8 h-8 rounded-full flex items-center justify-center text-primary',
      'transition-all duration-150 ease-in-out hover:bg-gray-200 hover:text-primary',
    )}
  >
    {children}
  </div>
)
