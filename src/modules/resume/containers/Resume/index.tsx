'use client'

import MainSidebar from '../../components/Sidebar'
import ResumeProvider from '../../context'
import Buttons from './Buttons'
import ResumeMainContainer from './MainContainer'

const ResumeContainer: React.FC = () => {
  return (
    <ResumeProvider>
      <div className="p-2 pb-16 2xl:p-6 xl:pb-10">
        <div className="grid grid-cols-12 gap-2 2xl:gap-3 ">
          <div className="col-span-12 xl:col-span-3 h-fit sticky top-0 md:top-2 z-[10] bg-background">
            <div className="space-y-3">
              <MainSidebar />

              <div className="hidden xl:block">
                <Buttons />
              </div>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-9">
            <ResumeMainContainer />
          </div>
        </div>

        <div className="fixed block bottom-0 right-0 left-0 xl:hidden px-2 py-4 bg-card shadow-xl">
          <Buttons />
        </div>
      </div>
    </ResumeProvider>
  )
}

export default ResumeContainer
