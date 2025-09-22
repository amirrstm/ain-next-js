'use client'

import { useEffect, useState } from 'react'

import type React from 'react'

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return <>{isHydrated ? children : null}</>
}

export default StoreProvider
