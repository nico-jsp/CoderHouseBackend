import { usersModel } from '../models/users.model.js'
import { hashPassword, comparePasswords } from '../../utils.js'


export default class UsersManager {
    async createUser(user) {
        const { email, password } = user
        try {
            const existeUsuario = await usersModel.find({ email })
            if (existeUsuario.length === 0) {
                const hashNewPassword = hashPassword(password)
                const newUser = { ...user, password: hashNewPassword }
                await usersModel.create(newUser)
                return newUser
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async loginUser(user) {
        const { email, password } = user

        const usuario = await usersModel.findOne({ email })
        if (usuario) {
            const isPassword = comparePasswords(password, usuario.password)
            if (isPassword) {
                return usuario

            }
        } else {
            return null
        }
    }
}
