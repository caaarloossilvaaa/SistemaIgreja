import { useState } from 'react'

interface IProps {
  children?: any
  activecondition?: boolean
}

export function SidebarLinkGroup({ children, activecondition }: IProps) {
  const [open, setOpen] = useState(activecondition)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <li
      className={`px-3 py-2 rounded-md mb-0.5 last:mb-0 hover:bg-slate-700 duration-200 ${
        activecondition && 'bg-slate-900'
      }`}
    >
      {children(handleClick, open)}
    </li>
  )
}
