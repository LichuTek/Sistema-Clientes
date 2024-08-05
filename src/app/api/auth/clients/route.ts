import { NextResponse } from "next/server";
import Client from '@/models/client'
import { connectDB } from "@/libs/mongodb";

export async function POST(request: Request) {
    const { fullname, email, phone } = await request.json()
    console.log(fullname, email, phone)

    try {
        await connectDB() //Conexion a la base de datos
        const client = new Client({ // Creando el cliente con los datos desestructur
            fullname,
            email,
            phone
        })

        const savedUser = await client.save()
        console.log(savedUser)
        return NextResponse.json(savedUser)
    } catch (error) {
        console.log(error)
    }
}

export async function GET() {
    try {
        await connectDB(); // Conexion a la DB
        const clients = await Client.find();// agarro todos los clientes
        return NextResponse.json(clients)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error al recuperar los clientes" }, { status: 500 })

    }
}
