import { Schema, model, models } from "mongoose";

const userSchema = new Schema({ // 
    email:{
        type: String, // Tipo de dato
        unique:true, // Si es unico o puede repetirse
        required:true, // Si debe estar obligatoriamente
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email no valido"] // Modelo con el cual debe matchear y mensaje de error si falla
    },
    password:{
        type:String,
        required: [true, "Contraseña requerida"],
        select:false, // Cuando se realice una busqueda en la base de datos no devolvera la contraseña

    },
    fullname: {
        type:String,
        required: [true,"Usuario requerido"],
        minLength: [6, "El usuario debe ser de al menos 3 caracteres"],
        maxLength:[50,"El usuario debe tener menos de 50 caracteres"]

    }
})


const User = models.User || model('User', userSchema) // Esto sirve para que si el modelo User ya esiste no lo vuelva a crear

export default User;