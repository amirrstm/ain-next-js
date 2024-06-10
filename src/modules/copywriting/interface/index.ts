export interface PromptCtx {
  tone: string
  variant: number
  category: string
  temperature: number
  inputs: Record<string, unknown>
}
