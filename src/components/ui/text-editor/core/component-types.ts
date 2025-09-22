import type { EditorConfig } from '@editorjs/editorjs'
import type React from 'react'
import type { EditorCore } from './editor-core'
import type { EditorCoreFactory } from './factory'

export interface Props extends Omit<EditorConfig, 'data'> {
  factory: EditorCoreFactory

  locale?: string
  holder?: string
  children?: React.ReactElement
  value?: EditorConfig['data']
  defaultValue?: EditorConfig['data']

  onInitialize?: (core: EditorCore) => void
}

export type WrapperProps = Omit<Props, 'factory'>
