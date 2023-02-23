import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true
    },
})

export const coursesModel = mongoose.model('Carts', cartsSchema)