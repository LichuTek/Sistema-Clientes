import mongoose from "mongoose";
const {MONGODB_URI} = process.env // IMPORTO LA URL DE LA DB

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI no esta definido")
} // CHEQUEO SI MONGODB_URI ESTA DEFINIDO EN .ENV


export const connectDB = async () => { // AL SER UNA FUNCION ASINCRONA, USO TRY/CATCH PARA HACER MANEJO DE ERRORES Y SABER SI SE CONECTO LA BASE DE DATOS
    try {
        const {connection} = await mongoose.connect(MONGODB_URI)
        if (connection.readyState === 1){
            console.log("MongoDB connected")
            return Promise.resolve(true)
        }
    } catch (error) {
        console.log(error)
        return Promise.reject(false);        
    }

}