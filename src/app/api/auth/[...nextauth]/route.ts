import NextAuth from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials"
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";
import bcrypt from 'bcryptjs'
const handler = NextAuth({ // Esta funcion se utiliza para para en el login setear las credenciales y retornar el usuario
    providers:[
        CredentialsProvider({
            name:'credentials',
            credentials:{
                email: {label: "Email", type:"email", placeholder: "jsmith"},
                password: {label:"Password", type: "password", placeholder: "******"}
            },
            async authorize (credentials,req) {
                await connectDB()
                console.log(credentials)

                const userFound = await User.findOne({email: credentials?.email}).select('+password')
                if (!userFound) throw new Error("Credenciales invalidas");
                console.log(userFound)
                const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password)
                if(!passwordMatch) throw new Error("Credenciales invalidas")

                return userFound
                    
            },
        }),
    ],
    callbacks:{ // Lo que estoy haciendo con esta funcion es enviar informacion del usuario al frontend para luego utilizarlo
        jwt({account, token, user, profile, session}){
            if (user) token.user = user;
        
            return token
        },
        session({session,token}) { // En esta funcion retornamos datos al frontend al componente dashboard para luego utilizarlo

            session.user = token.user as any
            return session            
        },

    },
    pages: {
        signIn: '/login', // Sirve para que cuando coloco una ruta como localhost:3000/auth/signin se redireccione al login
    }

})

export { handler as GET, handler as POST }