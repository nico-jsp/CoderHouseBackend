import { Router } from "express";
// import ProductManager from "../dao/filesManagers/productManager.js";
import ProductManager from "../dao/mongoManagers/productsManager.js";
// import { productsModel } from "../dao/models/products.model.js";
const router = Router()

const productManager = new ProductManager()

const listaProductosPorAgregar = [
    {
        "title": "producto uno de prueba",
        "description": "Este es un producto prueba",
        "price": 313,
        "status": true,
        "thumbnail": "Sin imagen",
        "code": "abc123",
        "stock": 23,
        "category": "categoria1"
    },
    {
        "title": "producto prueba dos",
        "description": "Este es un producto prueba",
        "price": 200,
        "status": true,
        "thumbnail": "Sin imagen",
        "code": "abc125",
        "stock": 27,
        "category": "categoria1"
    },
    {
        "title": "producto prueba3",
        "description": "Este es otro producto de prueba",
        "price": 200,
        "status": true,
        "thumbnail": "Sin imagen",
        "code": "abc175",
        "stock": 25,
        "category": "categoria1"
    },
    {
        "title": "producto prueba4",
        "description": "Este es un producto prueba",
        "price": 270,
        "status": true,
        "thumbnail": "Sin imagen",
        "code": "abc174",
        "stock": 24,
        "category": "categoria2"
    },
    {
        "title": "producto 5 de prueba",
        "description": "Este es un producto prueba",
        "price": 200,
        "status": true,
        "thumbnail": "Sin imagen",
        "code": "abc131",
        "stock": 125,
        "category": "categoria2"
    },
    {
        "title": "producto prueba 6",
        "description": "Este es un producto prueba",
        "price": 23,
        "status": true,
        "thumbnail": "Sin imagen",
        "code": "abc132",
        "stock": 235,
        "category": "categoria3"
    },
    {
        "title": "producto prueba7",
        "description": "Este es otro producto de prueba",
        "price": 230,
        "status": true,
        "thumbnail": "Sin imagen",
        "code": "abc133",
        "stock": 225,
        "category": "categoria3"
    },
    {
        "title": "producto prueba8",
        "description": "Este es un producto prueba",
        "price": 20,
        "status": true,
        "thumbnail": "Sin imagenes",
        "code": "abc134",
        "stock": 125,
        "category": "categoria3"
    },
    {
        "title": "producto prueba9",
        "description": "Este es un producto prueba",
        "price": 220,
        "status": true,
        "thumbnail": "Sin imagen",
        "code": "abc135",
        "stock": 173,
        "category": "categoria4"
    },
    {
        "title": "producto prueba 10",
        "description": "Este es un producto prueba",
        "price": 250,
        "status": true,
        "thumbnail": "Sin imagenes",
        "code": "abc136",
        "stock": 195,
        "category": "categoria4"
    },
    {
        "title": "producto prueba 11 editado",
        "description": "Este es un producto prueba",
        "price": 270,
        "status": true,
        "thumbnail": "Imagen 1",
        "code": "asd988",
        "stock": 290,
        "category": "categoria5"
    },
    {
        "title": "Producto 12",
        "description": "Es un nuevo producto ingresado",
        "price": "155",
        "status": true,
        "thumbnail": "Imagen 1",
        "code": "asd987",
        "stock": "32",
        "category": "categoria5"
    },
    {
        "title": "Producto 13",
        "description": "Es un nuevo producto ingresado",
        "price": "176",
        "status": true,
        "thumbnail": "image 1",
        "code": "ta1l50j",
        "stock": "37",
        "category": "categoria5"
    },
    {
        "title": "producto catorce",
        "description": "Este es un producto prueba",
        "price": 313,
        "status": true,
        "thumbnail": "Sin imagen",
        "code": "abc923",
        "stock": 23,
        "category": "categoria1"
    },
    {
        "title": "producto quince",
        "description": "Este es un producto prueba",
        "price": 200,
        "status": true,
        "thumbnail": "Sin imagen",
        "code": "abc925",
        "stock": 27,
        "category": "categoria1"
    },
    {
        "title": "producto 16",
        "description": "Este es otro producto de prueba",
        "price": 200,
        "status": true,
        "thumbnail": "Sin imagen",
        "code": "abc975",
        "stock": 25,
        "category": "categoria1"
    },
    {
        "title": "producto 17",
        "description": "Este es un producto prueba",
        "price": 270,
        "status": true,
        "thumbnail": "Sin imagen",
        "code": "abc974",
        "stock": 24,
        "category": "categoria2"
    },
    {
        "title": "producto 18",
        "description": "Este es un producto prueba",
        "price": 200,
        "status": true,
        "thumbnail": "Sin imagen",
        "code": "abc931",
        "stock": 125,
        "category": "categoria2"
    },
    {
        "title": "producto prueba 19",
        "description": "Este es un producto prueba",
        "price": 23,
        "status": true,
        "thumbnail": "Sin imagen",
        "code": "abc932",
        "stock": 235,
        "category": "categoria3"
    },
    {
        "title": "producto prueba 20",
        "description": "Este es otro producto de prueba",
        "price": 230,
        "status": true,
        "thumbnail": "Sin imagen",
        "code": "abc933",
        "stock": 225,
        "category": "categoria3"
    },
    {
        "title": "producto 21",
        "description": "Este es un producto prueba",
        "price": 20,
        "status": true,
        "thumbnail": "Sin imagenes",
        "code": "abc934",
        "stock": 125,
        "category": "categoria3"
    },
    {
        "title": "producto 22",
        "description": "Este es un producto prueba",
        "price": 220,
        "status": true,
        "thumbnail": "Sin imagen",
        "code": "abc935",
        "stock": 173,
        "category": "categoria4"
    },
    {
        "title": "producto 23",
        "description": "Este es un producto prueba",
        "price": 250,
        "status": true,
        "thumbnail": "Sin imagenes",
        "code": "abc936",
        "stock": 195,
        "category": "categoria4"
    },
    {
        "title": "Producto 24",
        "description": "Es un nuevo producto ingresado",
        "price": "176",
        "status": true,
        "thumbnail": "image 1",
        "code": "ta1l501",
        "stock": "37",
        "category": "categoria5"
    }
]
router.get('/create', async (req, res) => {
    await productManager.createProducts(listaProductosPorAgregar)
    res.json({ message: 'Productos creados con exito' })
})


router.get('/', async (req, res) => {
    const { limit, orderBy } = req.query
    // console.log('imprimi el limite')
    if (limit > 0 || orderBy !== undefined) {
        if (limit > 0) {
            const productos = await productManager.getProductsLimit(limit)
            res.json({ productos: productos })

        } else {
            const productos = await productManager.getProductsOrdered(orderBy)
            res.json({ productos: productos })

        }
    } else {
        const productos = await productManager.getProducts()
        res.json({ productos: productos })
    }

    // if (limit > 0) {
    //     // const productosLimit = productos.slice(0, limit)
    //     // res.json({ productos: productosLimit })
    // } else {
    // const productos = await productManager.getProducts(req.query)

    //     res.json({ productos: productos })

    // }
})

// router.get('/:pid', async (req, res) => {
//     const { pid } = req.params
//     // const producto = await productManager.getProductById(JSON.parse(pid))
//     // res.status(200).json({ producto: producto })
// })


// router.post('/', async (req, res) => {
//     const { title, description, price, status, thumbnail, code, stock, category } = req.body
//     let posted = await productManager.addProduct(title, description, price, status, thumbnail, code, stock, category)
//     console.log(posted)
//     if (posted) {
//         res.status(200).json({ message: 'Producto agregado con exito' })

//     } else {
//         res.status(400).json({ message: 'El codigo del producto ya existe' })

//     }
// })

// router.put('/:pid', async (req, res) => {
//     const { pid } = req.params
//     const mods = req.body
//     // console.log(pid)
//     // console.log(mods)
//     const edited = await productManager.updateProduct((JSON.parse(pid)), mods)
//     if (edited) {
//         res.status(200).json({ message: 'Producto modificado con exito' })

//     } else {
//         res.status(400).json({ message: 'El codigo del producto no existe' })

//     }

// })

// router.delete('/:pid', async (req, res) => {
//     const { pid } = req.params

//     const deleted = await productManager.deleteProduct((JSON.parse(pid)))
//     if (deleted) {
//         res.status(200).json({ message: 'Producto eliminado con exito' })

//     } else {
//         res.status(400).json({ message: 'El codigo del producto no existe' })

//     }
// })

export default router