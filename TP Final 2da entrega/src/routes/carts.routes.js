import { Router } from "express";
import CartsManager from "../dao/mongoManagers/cartsManager.js";
import ProductManager from "../dao/mongoManagers/productsManager.js";
// import ProductManager from "../dao/filesManagers/ProductManager.js";

const router = Router()

const cartManager = new CartsManager()
const productManager = new ProductManager()


router.get('/', async (req, res) => {
    const { limit } = req.query
    const carritos = await cartManager.getCarts()
    res.status(200).json({ carritos: carritos })


})

router.get('/:cid', async (req, res) => {

    const { cid } = req.params
    const cart = await cartManager.getCartById(cid)
    res.status(200).json({ "Productos del carrito seleccionado": cart })
})
//Crea un carrito vacio
router.post('/', async (req, res) => {
    // const {newCarrito} = req.body
    console.log(req.body);
    let posted = await cartManager.addCart(req.body)
    console.log(posted)
    if (posted) {
        res.status(200).json({ message: 'Carrito agregado con exito' })

    } else {
        res.status(400).json({ message: 'No se pudo agregar el carrito' })

    }
})

//Actualiza todo el carrito con el arreglo de productos {item, cant}
router.put('/:cid', async (req, res) => {
    const { cid } = req.params
    const { productos } = req.body
    const cart = await cartManager.addProducts(cid, productos)
    res.json({ cart: cart })

})

//Actualiza en 1 la cantidad de 1 producto X en un carrito X
router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { cant } = req.body
    const cart = await cartManager.addProductToCart(cid, pid, cant)
    res.json({ cart: cart })

})

//Elimina un producto del carrito en su totalidad
router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const cart = await cartManager.deleteProductFromCart(cid, pid)
    res.json({ cart: cart })

})

//Elimina todos los productos del carrito en su totalidad
router.delete('/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartManager.deleteAllProductsFromCart(cid)
    res.json({ cart: cart })

})


export default router