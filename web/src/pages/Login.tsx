import { FormLogin } from '../components/Login/FormLogin'

export function Login() {
  return (
    <>
      <div className="absolute left-0 p-4">
        <img src="/logo.png" alt="logo" width={48} height={48} />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex w-full h-screen bg-slate-100 xl:w-3/5 items-center justify-center">
          <FormLogin />
        </div>
      </div>
    </>
  )
}
