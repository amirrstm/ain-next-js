import { type ReactElement, useEffect, useRef } from 'react'

import type { Props } from './component-types'
import type { EditorCore } from './editor-core'

function ReactEditorJS({
  factory,
  holder,
  defaultValue,
  children,
  value,

  onInitialize,
  ...restProps
}: Props): ReactElement {
  const memoizedHolder = useRef(holder ?? `react-editor-js-${Date.now().toString(16)}`)

  const editorJS = useRef<EditorCore | null>(null)

  useEffect(() => {
    editorJS.current = factory({
      holder: memoizedHolder.current,
      ...(defaultValue && { data: defaultValue }),
      ...restProps
    })

    onInitialize?.(editorJS.current)

    return () => {
      editorJS.current?.destroy()
    }
  }, [defaultValue, factory, onInitialize])

  useEffect(() => {
    if (value) {
      editorJS.current?.render(value)
    }
  }, [value])

  return children || <div id={memoizedHolder.current} />
}

export default ReactEditorJS
