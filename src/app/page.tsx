import React from 'react'
import Link from 'next/link';
function HomePage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/background.png')" }}>
        <h1 className="text-4xl mb-10 font-bold">Bienvenido al sistema de Administración de clientes!</h1>
        <Link href="/login">
          <button className="mt-10 bg-customGreen2 font-bold text-white py-2 px-4 rounded-lg">Iniciar Sesión</button>
        </Link>
      </div>
    </>
  );
}


export default HomePage