import { Router } from "express";
import CartsManager from "../dao/filesManagers/cartsManager.js";
import ProductManager from "../dao/filesManagers/ProductManager.js";

const router = Router()

const cartManager = new CartsManager()
const productManager = new ProductManager()


router.get('/', async (req, res) => {
    const { limit } = req.query
    const carritos = await cartManager.getCarts()
    if (limit > 0) {
        const carritosLimit = carritos.slice(0, limit)
        res.json({ carritos: carritosLimit })
    } else {
        res.json({ carritos: carritos })

    }
})

router.get('/:cid', async (req, res) => {

    const { cid } = req.params
    const cart = await cartManager.getCartById(JSON.parse(cid))
    res.status(200).json({ "Productos del carrito seleccionado": cart.products })
})

router.post('/', async (req, res) => {

    let posted = await cartManager.addCart()
    console.log(posted)
    if (posted) {
        res.status(200).json({ message: 'Carrito agregado con exito' })

    } else {
        res.status(400).json({ message: 'No se pudo agregar el carrito' })

    }
})

router.post('/:cid/products/:pid', async (req, res) => {
    //Agregar el ID del producto pid al arreglo de productos del carrito cid, y la cantidad quantity, de uno en uno, del mismo seleccionado.
    // Si ya existe el producto, sumar a las cantidades
    const { cid, pid } = req.params

    let existeProducto = productManager.existStockOfProduct(JSON.parse(pid))
    console.log(existeProducto)
    if (!existeProducto) {
        res.status(400).json({ message: 'No se pudo agregar al carrito, el producto no existe, o no tiene stock' })


    } else {
        let added = await cartManager.addProduct(JSON.parse(cid), JSON.parse(pid))
        // console.log(added)
        if (added) {
            res.status(200).json({ message: 'Producto agregado al carrito con exito' })

        } else {
            res.status(400).json({ message: 'No se pudo agregar al carrito' })

        }
    }



})



export default router