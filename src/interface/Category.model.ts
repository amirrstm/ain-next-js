export interface Category {
  _id: string
  name: string
  slug: string
  description: string
  children: Category[]
}

export interface AppInput {
  _id: string
  name: string
  type: string
  category: string
  isActive: boolean
  isRequired: boolean
  multiline: boolean

  title: string
  placeholder: string
  description: string
}

export interface AppCategory extends Omit<Category, 'children'> {
  inputs: AppInput[]
}
