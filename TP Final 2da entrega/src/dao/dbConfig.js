import mongoose from "mongoose";

const URL = 'mongodb+srv://mongo-user:mongoUserUse@cluster-dockertest.vsna5.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(URL, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Conectado con exito a la base de datos')
    }
})