import React from 'react'
import { Link, redirect } from 'react-router-dom'

export function FormLogin() {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(e)
    return redirect('/')
  }
  return (
    <div className="flex flex-col text-slate-800 w-1/2 h-1/2 px-8 pt-6 pb-8 bg-white bg-opacity-20 rounded-2xl shadow-2xl">
      <h1 className="text-2xl font-bold">Bem vindo de volta! ✨</h1>
      <form className="mt-8 mb-4">
        <div className="mb-8">
          <label className="block text-lg text-slate-600 font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none font-normal border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight hover:border-gray-300 focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg text-slate-600 font-semibold mb-2" htmlFor="password">
            Senha
          </label>
          <input
            className="shadow appearance-none font-normal border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight hover:border-gray-300 focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
          />
        </div>
        <div className="flex items-center justify-between">
          <a
            className="inline-block align-baseline font-normal lg:text-base md:text-sm underline text-slate-600 hover:text-blue-800"
            href="#"
          >
            Esqueceu sua senha?
          </a>
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={e => handleLogin(e)}
            type="button"
          >
            Login
          </button>
        </div>
      </form>
      <div className="flex items-center justify-start mt-4 mb-10 ">
        <span className="text-center font-normal text-base">
          Ainda não tem uma conta?{' '}
          <a className="align-baseline text-purple-500 hover:text-purple-800" href="/">
            Solicite seu acesso aqui!
          </a>
        </span>
      </div>
      <p className="text-center text-gray-500 text-xs">
        &copy;2023 Carlos Silva. Todos os direitos reservados.
      </p>
    </div>
  )
}
