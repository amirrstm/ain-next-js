import { type WrapperProps as Props, ReactEditorJS } from '../core'
import { ClientEditorCore } from './client-editor-core'

import type { EditorConfig } from '@editorjs/editorjs'

function ReactEditorJSClient(props: Props) {
  const factory = (config: EditorConfig) => new ClientEditorCore(config)

  return <ReactEditorJS factory={factory} {...props} />
}

export default ReactEditorJSClient
