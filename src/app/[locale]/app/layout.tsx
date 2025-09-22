import AppLayoutContainer from '@/modules/app/containers/AppLayout'

import type React from 'react'

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AppLayoutContainer>{children}</AppLayoutContainer>
}

export default AppLayout
