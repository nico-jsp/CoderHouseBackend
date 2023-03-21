import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'


//Variable __dirname para usar con type = module porque no lo tiene implementado
export const __dirname = dirname(fileURLToPath(import.meta.url))

export const hashPassword = async (password) => {
    return bcrypt.hash(password, 10) //no le hace falta el await porque la devuelve directamente
}

export const comparePasswords = async (password, passwordBD) => {
    return bcrypt.compare(password, passwordBD)
}