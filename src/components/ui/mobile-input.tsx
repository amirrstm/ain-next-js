import { IconCheck, IconChevronDown } from '@tabler/icons-react'
import * as React from 'react'
import SVG from 'react-inlinesvg'

import { COUNTRY_CODES } from '@/constants/country-codes'
import { cn } from '@/lib/utils'

import { Button } from './button'
import { Command, CommandItem, CommandList } from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export interface MobileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  searchPlaceholder?: string
  value?: { text?: string; countryCode?: string }
  onChange?: (value: { text: string; countryCode: string }) => void
}

const MobileInput = React.forwardRef<HTMLInputElement, MobileInputProps>(
  ({ className, type, value, onChange, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [codeValue, setCodeValue] = React.useState('+98')
    const country = COUNTRY_CODES.find((country) => country.dial_code === codeValue)

    return (
      <div className="flex flex-row-reverse overflow-hidden rounded-md border border-input rtl:flex-row">
        <input
          className={cn(
            'flex h-[30px] w-full border-l border-l-input bg-transparent px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-card',
            className
          )}
          dir="ltr"
          onChange={(e) => onChange?.({ countryCode: codeValue, text: e.target.value })}
          ref={ref}
          type={type}
          value={value?.text}
          {...props}
        />

        <Popover onOpenChange={setOpen} open={open}>
          <PopoverTrigger asChild>
            <Button
              aria-expanded={open}
              className={cn(
                '!ring-0 h-[30px] w-[100px] justify-between rounded-none border-none px-1 py-0',
                'dark:border-input dark:bg-card dark:text-white dark:placeholder-text-[#d9d9d9] dark:ring-offset-card'
              )}
              dir="ltr"
              role="combobox"
              variant="outline"
            >
              <span className="flex items-center gap-2">
                <SVG height={18} src={`https://flagicons.lipis.dev/flags/4x3/${country?.code.toLowerCase()}.svg`} width={18} />
                <span className="flex text-xs">{`${country?.dial_code}`}</span>
              </span>
              <IconChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent asChild className="w-[200px] p-0">
            <Command>
              <CommandList>
                {COUNTRY_CODES.filter((c) => c.code === 'IR').map((country) => (
                  <CommandItem
                    dir="ltr"
                    key={country.code}
                    onSelect={(currentValue) => {
                      setCodeValue(currentValue)
                      setOpen(false)
                    }}
                    value={country.code}
                  >
                    <span className="flex w-full items-center justify-between">
                      <span className="flex items-center gap-2">
                        <SVG
                          height={18}
                          src={`https://flagicons.lipis.dev/flags/4x3/${country.code.toLowerCase()}.svg`}
                          width={18}
                        />
                        <span className="mt-0.5 flex text-xs">{`${country.dial_code}`}</span>
                      </span>
                      <IconCheck className={cn('mr-2 h-4 w-4', codeValue === country.code ? 'opacity-100' : 'opacity-0')} />
                    </span>
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    )
  }
)
MobileInput.displayName = 'MobileInput'

export { MobileInput }
