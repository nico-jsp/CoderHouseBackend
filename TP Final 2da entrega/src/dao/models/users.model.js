import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
        default: ' ',
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dni: {
        type: Number,
        required: true,
        default: 0,

    },
    password: {
        type: String,
        required: true,
    },
})

export const usersModel = mongoose.model('Users', usersSchema)


