import { Metadata, Viewport } from 'next'

import HomeContainer from '@/modules/home/containers/Home'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AINevis',
    description: 'AINevis',
  }
}

export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  width: 'device-width',
  themeColor: '#0f0f0f',
}

export default async function Home() {
  return <HomeContainer />
}
