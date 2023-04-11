import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const URL = process.env.MONGOURL
try {
    await mongoose.connect(URL)
    console.log('Conectado con exito a la base de datos')

} catch (error) {
    console.log(error)

}
// mongoose.connect(URL, (error) => {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log('Conectado con exito a la base de datos')
//     }
// })