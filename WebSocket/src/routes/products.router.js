import { Router } from 'express'
import ProductManager from '../ProductManager.js'


const router = Router()


const productManager = new ProductManager()


// router.get('/realtimeproducts', (req, res) => {

// })

router.get('/', async (req, res) => {
    const { limit } = req.query
    const productos = await productManager.getProducts()
    if (limit > 0) {
        const productosLimit = productos.slice(0, limit)
        res.json({ productos: productosLimit })
    } else {
        res.json({ productos: productos })

    }
})

router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    const producto = await productManager.getProductById(JSON.parse(pid))
    res.status(200).json({ producto: producto })
})

router.post('/', async (req, res) => {
    const { title, description, price, status, thumbnail, code, stock, category } = req.body
    let posted = await productManager.addProduct(title, description, price, status, thumbnail, code, stock, category)
    console.log(posted)
    if (posted) {
        res.status(200).json({ message: 'Producto agregado con exito' })

    } else {
        res.status(400).json({ message: 'El codigo del producto ya existe' })

    }
})

router.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const mods = req.body
    // console.log(pid)
    // console.log(mods)
    const edited = await productManager.updateProduct((JSON.parse(pid)), mods)
    if (edited) {
        res.status(200).json({ message: 'Producto modificado con exito' })

    } else {
        res.status(400).json({ message: 'El codigo del producto no existe' })

    }

})

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params

    const deleted = await productManager.deleteProduct((JSON.parse(pid)))
    if (deleted) {
        res.status(200).json({ message: 'Producto eliminado con exito' })

    } else {
        res.status(400).json({ message: 'El codigo del producto no existe' })

    }
})

export default router