import type { EditorConfig } from '@editorjs/editorjs'
import type { EditorCore } from './editor-core'

export type EditorCoreFactory = (config: EditorConfig) => EditorCore
