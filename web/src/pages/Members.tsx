import { useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'

export function Members() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="flex w-screen h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        Membros
      </div>
    </div>
  )
}
