import { Metadata } from 'next'

import { appViewport } from '@/constants'
import DashboardContainer from '@/modules/app/containers/Dashboard'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AINevis',
    description: 'AINevis',
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function App() {
  return <DashboardContainer />
}
