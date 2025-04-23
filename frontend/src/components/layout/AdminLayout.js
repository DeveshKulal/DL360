import React from 'react'
import AdminSidebar from '../../pages/Admin/AdminSidebar'
import Header from '../dashboard/Header'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <>
      <div className='flex  min-h-screen'>
        <div className='flex ' >
          <AdminSidebar />
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

export default AdminLayout