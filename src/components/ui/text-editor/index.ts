import { WrapperProps } from './core'

export function createReactEditorJS(): (props: WrapperProps) => JSX.Element {
  if (typeof window !== 'undefined') {
    const Component = require('./client')
    return Component.default || Component
  } else {
    const Component = require('./client')
    return Component.default || Component
  }
}
