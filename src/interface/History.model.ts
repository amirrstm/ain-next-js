export interface History {
  _id: string
  user: string
  content: string
  category: string
  createdAt: string
  updatedAt: string
  inputValues: InputValues[]
}

export interface InputValues {
  input: string
  value: string
}
