import { Viewport } from 'next'

import React from 'react'

import { appDefaultViewport } from '@/constants/viewport'
import AppLayoutContainer from '@/modules/app/containers/AppLayout'

export const viewport: Viewport = appDefaultViewport

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AppLayoutContainer> {children}</AppLayoutContainer>
}

export default AppLayout
