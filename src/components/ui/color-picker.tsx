import * as React from 'react'

export interface ColorProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const ColorPicker = React.forwardRef<HTMLInputElement, ColorProps>(({ className, type, label, ...props }, ref) => {
  return (
    <div className="border border-input rounded-md flex bg-white dark:bg-transparent">
      <div className="border-e border-e-input flex-1 h-9 flex items-center px-3">
        <p className="text-sm">{label}</p>
      </div>
      <div className="px-3 flex items-center">
        <input ref={ref} type="color" className="bg-transparent h-8 border-none" {...props} />
      </div>
    </div>
  )
})
ColorPicker.displayName = 'ColorPicker'

export { ColorPicker }
