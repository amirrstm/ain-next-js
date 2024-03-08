import { AppCategory } from '@/interface/Category.model'

export interface IHistory {
  _id: string
  content: string
  createdAt: string
  category: AppCategory
  inputValues: HistoryInput[]
}

export interface HistoryInput {
  value: string
  input: {
    name: string
    type: string
    title: string
    multiline: boolean
    description: string
  }
}
