import { Metadata } from 'next'

import HomeContainer from '@/modules/home/containers/Home'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AINevis',
    description: 'AINevis',
  }
}

export default async function Home() {
  return <HomeContainer />
}
