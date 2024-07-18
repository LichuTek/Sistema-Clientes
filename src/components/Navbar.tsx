import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

async function Navbar() { // Convierto el componente en una funcion async
    const session = await getServerSession()
    console.log(session?.user)
    return (
        <nav className='bg-customBlue p-4'>
            <div className='flex justify-between container mx-auto'>
                <h1 className='font-bold text-xl'>Clinica Stay Safe</h1>
                <ul className='flex gap-x-2'>
                    {session ? (
                        <li className='px-3 py-1'>
                            <Link href="/dashboard/profile">Perfil</Link>
                        </li>
                    ) : (
                        <>
                            <li className='px-3 py-1'>
                                <Link href="/login">Iniciar Sesion</Link>
                            </li>
                        </>
                    )}

                </ul>
            </div>
        </nav>
    )
}

export default Navbar