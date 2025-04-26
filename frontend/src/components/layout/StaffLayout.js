import React from 'react'
import Header from '../dashboard/Header'
import { Outlet } from 'react-router-dom'
import StaffSidebar from '../../pages/Staff/StaffSidebar'

function StaffLayout() {
  return (
    <>
      <div className='flex h-screen'>
        <div >
          <StaffSidebar />
        </div>
        {/* Main Content */}
        <div className='flex-1 flex flex-col'>
          {/* Header */}
          <div >
            <Header/>
          </div>
          {/* Page Content */}
          <main className='bg-gray-100 flex-1 overflow-y-auto'>
            <Outlet/>
          </main>
        </div>
      </div>
    </>
  )
}

export default StaffLayout