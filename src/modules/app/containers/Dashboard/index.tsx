'use client'

import React from 'react'

import DashboardHeader from '../../components/DashboardHeader'
import DashboardStat from '../../components/DashboardStat'

const DashboardContainer: React.FC = () => {
  return (
    <div className="p-2 md:p-6">
      <DashboardHeader />

      <DashboardStat />
    </div>
  )
}

export default DashboardContainer
