import { Router } from "express";
import UsersManager from '../dao/mongoManagers/usersManager.js'
const router = Router()
const usersManager = new UsersManager()

router.post('/registro', async (req, res) => {
    const newUser = await usersManager.createUser(req.body)
    if (newUser) {
        res.redirect('/views')
    } else {
        res.redirect('/views/errorRegistro')
    }
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (email === 'admin@gmail.com' && password === 'adminPass') {
        req.session.firstName = 'Pepe'
        req.session.admin = true
        res.redirect('/views/admin')

    } else {
        const user = await usersManager.loginUser(req.body)
        if (user) {
            req.session.email = user[0].email
            req.session.password = user[0].password
            req.session.firstName = user[0].firstName
            req.session.admin = false
            res.redirect('/views/perfil')
        } else {
            res.redirect('/views/errorLogin')
        }

    }


})

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error)
            res.json({ message: error })
        } else {
            // res.json({ message: 'Sesion eliminada con exito' })
            res.redirect('/views')
        }
    })
})


export default router