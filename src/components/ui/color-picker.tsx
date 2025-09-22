import * as React from 'react'

export interface ColorProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const ColorPicker = React.forwardRef<HTMLInputElement, ColorProps>(({ className, type, label, ...props }, ref) => {
  return (
    <div className="flex rounded-md border border-input bg-white dark:bg-transparent">
      <div className="flex h-9 flex-1 items-center border-e border-e-input px-3">
        <p className="text-sm">{label}</p>
      </div>
      <div className="flex items-center px-3">
        <input className="h-8 border-none bg-transparent" ref={ref} type="color" {...props} />
      </div>
    </div>
  )
})
ColorPicker.displayName = 'ColorPicker'

export { ColorPicker }
