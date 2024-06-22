export interface PromptCtx {
  tone: string
  category: string
  temperature: number
  inputs: Record<string, unknown>
}
