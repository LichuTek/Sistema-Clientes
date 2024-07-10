"use client"
import { SessionProvider } from "next-auth/react"

interface Props {
    children:React.ReactNode;
}

function Providers({children}: Props) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default Providers

//Este código define un componente Providers que envuelve sus hijos (children) con el componente SessionProvider de next-auth.
//Esto permite que cualquier componente dentro de Providers tenga acceso al contexto de la sesión de autenticación proporcionado por next-auth. 
//La directiva "use client" asegura que este código se ejecute en el cliente.