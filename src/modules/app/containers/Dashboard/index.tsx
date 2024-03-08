'use client'

import React from 'react'

import CategoryContainer from '@/modules/copywriting/containers/Category'

import DashboardHeader from '../../components/DashboardHeader'
import DashboardStat from '../../components/DashboardStat'
import QuickAccess from '../../components/QuickAccess'

const DashboardContainer: React.FC = () => {
  return (
    <div className="p-2 md:p-6">
      <DashboardHeader />

      <DashboardStat />

      <div className="hidden md:block">
        <QuickAccess />
      </div>

      <div className="block md:hidden mt-4">
        <CategoryContainer inner />
      </div>
    </div>
  )
}

export default DashboardContainer
