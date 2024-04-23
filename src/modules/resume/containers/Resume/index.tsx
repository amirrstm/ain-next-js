import React from 'react'

import MainSidebar from '../../components/Sidebar'

const ResumeContainer: React.FC = () => {
  return (
    <div className="p-4 xl:p-6 xl:pb-10">
      <div className="grid grid-cols-12 gap-4 lg:gap-5 xl:gap-6">
        <div className="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4 2xl:col-span-3">
          <MainSidebar />
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-8 2xl:col-span-9">
          <p>Content</p>
        </div>
      </div>
    </div>
  )
}

export default ResumeContainer
