export interface Plan {
  name: string
  _id: string
  price: number
  slug: string
  isActive: boolean
  generation: number
  isDefault: boolean
  features: string[]
  updatedAt: string
  createdAt: string
  description: string
  offForAnnual: boolean
}
