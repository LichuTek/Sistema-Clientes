import { Schema, model, models } from "mongoose";

const clientSchema = new Schema({ // 
    email:{
        type: String, // Tipo de dato
        unique:false, // Si es unico o puede repetirse
        required:true, // Si debe estar obligatoriamente
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email no valido"] // Modelo con el cual debe matchear y mensaje de error si falla
    },
    fullname: {
        type:String,
        required: [true,"Nombre requerido"],
        unique:false, // Si es unico o puede repetirse
        minLength: [6, "El nombre debe ser de al menos 6 caracteres"],
        maxLength:[50,"El nombre debe tener menos de 50 caracteres"]

    },
    phone: {
        type:String,
        required: [true,"Nombre requerido"],
        unique:false, // Si es unico o puede repetirse
        minLength: [6, "El numero debe tener al menos 6 caracteres"],
        maxLength:[15,"El numero debe tener como maximo 15 caracteres"]

    },
    turno: {
        type:String,
        //required: [true,"Nombre requerido"],
        required: false,
        unique:false, // Si es unico o puede repetirse
        minLength: [6, "El nombre debe ser de al menos 3 caracteres"],
        maxLength:[50,"El nombre debe tener menos de 50 caracteres"]

    }
})


const Client = models.Client || model('Client', clientSchema) // Esto sirve para que si el modelo User ya esiste no lo vuelva a crear

export default Client;