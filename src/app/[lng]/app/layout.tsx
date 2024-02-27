import React from 'react'

import AppLayoutContainer from '@/modules/app/containers/AppLayout'

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AppLayoutContainer> {children}</AppLayoutContainer>
}

export default AppLayout
