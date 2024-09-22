import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />

        <div className="flex-grow-1 p-4 ml-6">
        <AppContent /> {/* Assuming AppContent is the main content area */}
      </div>
        {/* <div className="body flex-grow-1">
          <AppContent />
        </div> */}
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
