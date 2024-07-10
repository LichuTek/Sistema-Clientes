"use client"
import React from 'react'
import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// Creando código del form
function LoginPage() {
  // Funcion que se va a ejecutar al enviar el form
  const [error, setError] = useState("")
  const router = useRouter() // extraigo lo que viene en userouter
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await signIn('credentials',{ // Si el login salio bien voy a usar esta res para hacer el redirect
        email: formData.get('email'),
        password: formData.get("password"),
        redirect: false

      });
      if (res?.error) return setError(res.error as string) // Si la respuesta es error arroja un error

      if (res?.ok) return router.push("/dashboard/profile") // Realizo la redireccion al dashboard
      
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <div className='justify-center h-[calc(100vh-4rem)] flex items-center'>
      <form onSubmit={handleSubmit} className='bg-neutral-950 px-8 py-10 w-3/12'>
        {error && <div className='bg-red-500 text-white p-2 mb-2'>{error}</div>}
        <h1 className='text-4xl font-bold mb-7'>Ingresar</h1>
        <input type="email" placeholder='ejemplo@gmail.com' name='email' className='bg-zinc-800 px-4 py-2 block mb-2 w-full' />
        <input type="password" placeholder='******' name='password' className='bg-zinc-800 px-4 py-2 block mb-2 w-full' />
        <button className='bg-indigo-500 px-4 py-2'>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage