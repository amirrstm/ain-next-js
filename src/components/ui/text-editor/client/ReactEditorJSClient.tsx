import { EditorConfig } from '@editorjs/editorjs'
import React from 'react'

import { WrapperProps as Props, ReactEditorJS } from '../core'
import { ClientEditorCore } from './client-editor-core'

function ReactEditorJSClient(props: Props) {
  const factory = React.useCallback((config: EditorConfig) => new ClientEditorCore(config), [])

  return <ReactEditorJS factory={factory} {...props} />
}

export default ReactEditorJSClient
