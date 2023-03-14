import { Router } from 'express'
import ProductManager from "../dao/mongoManagers/productsManager.js";

const productManager = new ProductManager()

const router = Router()

router.get('/', (req, res) => {
    res.render('login')
})

router.get('/registro', (req, res) => {
    res.render('registro')
})

router.get('/errorRegistro', (req, res) => {
    res.render('errorRegistro')
})

router.get('/errorLogin', (req, res) => {
    res.render('errorLogin')
})

router.get('/perfil', async (req, res) => {
    const productos = await productManager.getAllProducts()

    const { firstName } = req.session
    res.render('perfil', { firstName, productos })
})

router.get('/admin', async (req, res) => {
    const productos = await productManager.getAllProducts()

    const { firstName } = req.session
    res.render('admin', { firstName, productos })
})

export default router