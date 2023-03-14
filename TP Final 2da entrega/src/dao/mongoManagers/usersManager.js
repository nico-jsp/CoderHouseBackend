import { usersModel } from '../models/users.model.js'

export default class UsersManager {
    async createUser(user) {
        const { email } = user
        try {
            const existeUsuario = await usersModel.find({ email })
            if (existeUsuario.length === 0) {
                const newUser = await usersModel.create(user)
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
        const usuario = await usersModel.find({ email, password })
        if (usuario.length !== 0) {
            return usuario
        } else {
            return null
        }
    }
}
