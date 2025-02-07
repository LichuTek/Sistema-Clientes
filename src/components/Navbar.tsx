import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

async function Navbar() { // Convierto el componente en una funcion async
    const session = await getServerSession()
    console.log(session?.user)
    return (
        <nav className='bg-zinc-900 p-4'>
            <div className='flex justify-between container mx-auto'>
                <Link href="/">
                    <h1 className='font-bold text-xl'>NextAuth</h1>
                </Link>
                <ul className='flex gap-x-2'>
                    {session ? (
                        <li className='px-3 py-1'>
                            <Link href="/dashboard/profile">Perfil</Link>
                        </li>
                    ) : (
                        <>
                            <li className='px-3 py-1'>
                                <Link href="/login">Login</Link>
                            </li>
                            <li className='px-3 py-1'>
                                <Link href="/register">Registro</Link>
                            </li>
                            <li className='px-3 py-1'>
                                <Link href="/about">About</Link>
                            </li>
                        </>
                    )}

                </ul>
            </div>
        </nav>
    )
}

export default Navbar