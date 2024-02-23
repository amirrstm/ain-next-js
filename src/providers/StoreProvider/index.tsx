'use client'

import React, { useEffect, useState } from 'react'

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return <>{isHydrated ? children : null}</>
}

export default StoreProvider
