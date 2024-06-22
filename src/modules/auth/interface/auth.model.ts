import { Plan } from '@/interface/Plan.model'

export interface User {
  _id: string
  email: string
  lastName: string
  updatedAt: string
  firstName: string
  signUpDate: string
  signUpFrom: string
  userPlan: UserPlan
  mobileNumber: string
}

export interface UserPlan {
  plan: Plan
  _id: string
  used: {
    resumeAI: number
    generation: number
    resumeVoice: number
    resumeCustom: number
  }
  createdAt: string
  planExpired: string
  updatedAt: string
}
