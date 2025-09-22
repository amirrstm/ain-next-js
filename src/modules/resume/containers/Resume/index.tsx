'use client'

import MainSidebar from '../../components/Sidebar'
import ResumeProvider from '../../context'
import Buttons from './Buttons'
import ResumeMainContainer from './MainContainer'

const ResumeContainer: React.FC = () => {
  return (
    <ResumeProvider>
      <div className="p-2 pb-16 xl:pb-10 2xl:p-6">
        <div className="grid grid-cols-12 gap-2 2xl:gap-3">
          <div className="sticky top-0 z-[10] col-span-12 h-fit bg-background md:top-2 xl:col-span-3">
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

        <div className="fixed right-0 bottom-0 left-0 z-[10] block bg-card px-2 py-4 shadow-xl xl:hidden">
          <Buttons />
        </div>
      </div>
    </ResumeProvider>
  )
}

export default ResumeContainer
