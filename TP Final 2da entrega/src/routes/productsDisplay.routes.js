import { Router } from "express";

import ProductManager from "../dao/mongoManagers/productsManager.js";

const router = Router()

const productManager = new ProductManager()


router.get('/', async (req, res) => {
    const productos = await productManager.getAllProducts()
    res.render('index', { productos })

})

export default router