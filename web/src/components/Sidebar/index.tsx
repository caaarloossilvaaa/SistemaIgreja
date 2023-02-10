import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SidebarLinkGroup } from './SidebarLinkGroup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faGauge,
  faGears,
  faPeopleGroup,
  faPlaceOfWorship,
} from '@fortawesome/free-solid-svg-icons'

interface IProps {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: IProps) {
  const location = useLocation()
  const { pathname } = location

  const trigger = useRef<HTMLButtonElement>(null)
  const sidebar = useRef<HTMLInputElement>(null)

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  )

  // close on click outside
  useEffect(() => {
    const clickHandler = (target: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as unknown as Node) ||
        trigger.current.contains(target as unknown as Node)
      )
        return setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (keyCode: KeyboardEvent) => {
      if (!sidebarOpen || Number(keyCode) !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', String(sidebarExpanded))
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded')
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded')
    }
  }, [sidebarExpanded])

  return (
    <div>
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <Link to="/" className="block">
            <img src="/logo.png" alt="logo" width={48} height={48} />
          </Link>
        </div>
        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Páginas</span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <SidebarLinkGroup
                activecondition={pathname === '/' || pathname.includes('dashboard')}
              >
                {(handleClick: () => any, open: any) => {
                  return (
                    <React.Fragment>
                      <Link
                        to="/"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          (pathname === '/' || pathname.includes('dashboard')) &&
                          'hover:text-slate-200'
                        }`}
                        onClick={e => {
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FontAwesomeIcon className="shrink-0 h-6 w-6" icon={faGauge} />
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Dashboard
                            </span>
                          </div>
                        </div>
                      </Link>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>
              {/* Members */}
              <SidebarLinkGroup activecondition={pathname.includes('members')}>
                {(handleClick: () => any, open: any) => {
                  return (
                    <React.Fragment>
                      <Link
                        to="/members"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes('members') && 'hover:text-slate-200'
                        }`}
                        onClick={e => {
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FontAwesomeIcon className="shrink-0 h-6 w-6" icon={faPeopleGroup} />
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Membros
                            </span>
                          </div>
                        </div>
                      </Link>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>
              {/* Congregations */}
              <SidebarLinkGroup activecondition={pathname.includes('congregations')}>
                {(handleClick: () => any, open: any) => {
                  return (
                    <React.Fragment>
                      <a
                        href="/congregations"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes('congregations') && 'hover:text-slate-200'
                        }`}
                        onClick={e => {
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FontAwesomeIcon className="shrink-0 h-6 w-6" icon={faPlaceOfWorship} />
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Congregações
                            </span>
                          </div>
                        </div>
                      </a>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>
              {/* Letters */}
              <SidebarLinkGroup activecondition={pathname.includes('letters')}>
                {(handleClick: () => any, open: any) => {
                  return (
                    <React.Fragment>
                      <a
                        href="/letters"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes('letters') && 'hover:text-slate-200'
                        }`}
                        onClick={e => {
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FontAwesomeIcon className="shrink-0 h-6 w-6" icon={faEnvelope} />
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Cartas e Convites
                            </span>
                          </div>
                        </div>
                      </a>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>
              {/* Settings */}
              <SidebarLinkGroup activecondition={pathname.includes('settings')}>
                {(handleClick: () => any, open: any) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes('settings') && 'hover:text-slate-200'
                        }`}
                        onClick={e => {
                          e.preventDefault()
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FontAwesomeIcon className="shrink-0 h-6 w-6" icon={faGears} />
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Configurações
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && 'rotate-180'
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <Link
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Minha conta
                              </span>
                            </Link>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <Link
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Minhas notificações
                              </span>
                            </Link>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <Link
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Conectar aplicativo
                              </span>
                            </Link>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <Link
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Tarefas
                              </span>
                            </Link>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <Link
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Recados
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
          {/* More group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Outros</span>
            </h3>
            <ul className="mt-3">
              {/* Authentication */}
              <SidebarLinkGroup>
                {(handleClick: () => any, open: any) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          open && 'hover:text-slate-200'
                        }`}
                        onClick={e => {
                          e.preventDefault()
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className="fill-current text-slate-600"
                                d="M8.07 16H10V8H8.07a8 8 0 110 8z"
                              />
                              <path
                                className="fill-current text-slate-400"
                                d="M15 12L8 6v5H0v2h8v5z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Autenticação
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && 'rotate-180'
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <Link
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Trocar de usuário
                              </span>
                            </Link>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <Link
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Novo usuário
                              </span>
                            </Link>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <Link
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Trocar a senha
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>
        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
