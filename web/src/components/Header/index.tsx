import { List } from 'phosphor-react'
import { Notifications } from './Notifications'
import { UserMenu } from './UserMenu'

interface IProps {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function Header({ sidebarOpen, setSidebarOpen }: IProps) {
  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={e => {
                e.stopPropagation()
                setSidebarOpen(!sidebarOpen)
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <List fontSize={24} className="w-6 h-6 fill-current" />
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center">
            <Notifications />
            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 mx-3" />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
