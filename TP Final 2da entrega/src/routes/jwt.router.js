import { Router } from "express"
import { generateToken } from "../utils.js"
// import { usersModel } from "../dao/models/users.model.js"
import UsersManager from "../persistence/dao/mongoManagers/usersManager.js"
import { jwtValidation } from "../middlewares/jwt.middleware.js"
const router = Router()

const usersManager = new UsersManager()

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await usersManager.loginUser(req.body)

    if (user) {
        const token = generateToken(user)
        return res.cookie('token', token, { httpOnly: true }).json({ token })
    }
    res.json({ message: 'Usuario no existe' })
})


router.get('/login', jwtValidation, async (req, res) => {
    console.log('TOKEN VALIDADO')
    res.send('PROBANDO JWT')
})

export default router