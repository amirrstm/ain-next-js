import { EditorConfig } from '@editorjs/editorjs'
import React from 'react'

import { EditorCore } from './editor-core'
import { EditorCoreFactory } from './factory'

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
