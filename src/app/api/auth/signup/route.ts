import { NextResponse } from "next/server";
import User from '@/models/user' // Importo el modelo que se creo para mongo
import bcrypt from "bcryptjs"; // Importo bcrypt para hashear el password
import { connectDB } from "@/libs/mongodb";

// ESTA ES LA RUTA PARA REGISTRARSE, EN ESTA PARTE SE MANEJA EL BACKEND

export async function POST(request: Request) {
    const {fullname,email,password} = await request.json() // Recibe los datos y los desestructura
    console.log(fullname,email,password)
    if(!password || password.length < 6) // Hace la comprobacion de la constraseñá
        return NextResponse.json(
            {
                message:"La contraseña debe contener al menos 6 caracteres"
            },
            {
                status:400,
            }
        );

    try { // Al ser metodo asincrono lo pongo en try/catch para ver errores
        await connectDB() // Se conecta a la base de datos
        const userFound = await User.findOne({email}) // Busca en la base de datos si hay un email igual

        if(userFound) return NextResponse.json({ // Con este IF se devuelve un error en el caso de que userFound se haya encontrado
            message:"El email ya existe"
        },{
            status:400
        })
    
    
        // En el caso de que el email no sea encontrado es decir que el user puede registrarse, voy a pasar a encriptar la contraseña 
    
        const hashedPassword = await bcrypt.hash(password,12) // Esto nos da una Hashed Password ejecutando el algoritmo 12 veces
        const user = new User({
            email,
            fullname,
            password: hashedPassword
        })
    
        const savedUser = await user.save() // Guardo el usuario en la base de datos
    
        console.log(savedUser) // Lo muestro en consola
        return NextResponse.json({
            _id: savedUser.id,
            email: savedUser.email,
            fullname: savedUser.fullname,

        })
    } catch (error) {
        console.log(error)
        if (error instanceof Error){
            return NextResponse.json({
                message: error.message
            },
            {
                status:404
            })
        }
    }
}