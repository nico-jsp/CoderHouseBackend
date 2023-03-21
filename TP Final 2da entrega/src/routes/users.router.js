import { Router } from "express";
import passport from "passport";
import UsersManager from '../dao/mongoManagers/usersManager.js'

const router = Router()
const usersManager = new UsersManager()

//Registro sin Passport
// router.post('/registro', async (req, res) => {
//     const newUser = await usersManager.createUser(req.body)
//     if (newUser) {
//         res.redirect('/views')
//     } else {
//         res.redirect('/views/errorRegistro')
//     }
// })


router.post('/registro', passport.authenticate('registro', {
    failureRedirect: '/views/errorRegistro',
    successRedirect: '/views/perfil',
    passReqToCallback: true
}))

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (email === 'admin@gmail.com' && password === 'adminPass') {
        req.session.firstName = 'Pepe'
        req.session.admin = true
        res.redirect('/views/admin')

    } else {
        const user = await usersManager.loginUser(req.body)
        if (user) {
            req.session.email = user.email
            req.session.password = user.password
            req.session.firstName = user.firstName
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

router.get('/registroGithub', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/github', passport.authenticate('github'), (req, res) => {
    console.log(req);
    res.redirect('/views/perfil')
})

export default router