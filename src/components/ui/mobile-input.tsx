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
    const country = COUNTRY_CODES.find(country => country.dial_code === codeValue)

    return (
      <div className="flex rounded-md border border-input overflow-hidden">
        <input
          dir="ltr"
          ref={ref}
          type={type}
          value={value?.text}
          className={cn(
            'flex h-[30px] w-full border-l border-l-input bg-transparent dark:bg-card px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          onChange={e => onChange?.({ text: e.target.value, countryCode: codeValue })}
          {...props}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              dir="ltr"
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                'w-[100px] h-[30px] py-0 justify-between border-none rounded-none !ring-0 px-1',
                'dark:bg-card dark:text-white dark:placeholder-text-[#d9d9d9] dark:ring-offset-card dark:border-input',
              )}
            >
              <span className="flex items-center gap-2">
                <SVG
                  width={18}
                  height={18}
                  src={`https://flagicons.lipis.dev/flags/4x3/${country?.code.toLowerCase()}.svg`}
                />
                <span className="flex text-xs">{`${country?.dial_code}`}</span>
              </span>
              <IconChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent asChild className="w-[200px] p-0">
            <Command>
              <CommandList>
                {COUNTRY_CODES.filter(c => c.code === 'IR').map(country => (
                  <CommandItem
                    dir="ltr"
                    key={country.code}
                    value={country.code}
                    onSelect={currentValue => {
                      setCodeValue(currentValue)
                      setOpen(false)
                    }}
                  >
                    <span className="flex justify-between items-center w-full">
                      <span className="flex items-center gap-2">
                        <SVG
                          width={18}
                          height={18}
                          src={`https://flagicons.lipis.dev/flags/4x3/${country.code.toLowerCase()}.svg`}
                        />
                        <span className="flex text-xs mt-0.5">{`${country.dial_code}`}</span>
                      </span>
                      <IconCheck
                        className={cn('mr-2 h-4 w-4', codeValue === country.code ? 'opacity-100' : 'opacity-0')}
                      />
                    </span>
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    )
  },
)
MobileInput.displayName = 'MobileInput'

export { MobileInput }
