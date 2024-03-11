export interface Chat {
  _id: string
  user: string
  updatedAt: string
  createdAt: string
  messages: ChatMessage[]
}

export interface ChatMessage {
  _id: string
  role: string
  time?: string
  content: string
}
