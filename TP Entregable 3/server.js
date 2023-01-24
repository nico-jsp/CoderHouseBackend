import express from 'express'
import ProductManager from './ProductManager.js'

const app = express()

// comandos para que entienda el formato de info que le viene

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productManager = new ProductManager()


// rutas


app.get('/productos', async (req, res) => {
    const { limit } = req.query
    const productos = await productManager.getProducts()
    if (limit > 0) {
        const productosLimit = productos.slice(0, limit)
        res.json({ productos: productosLimit })
    } else {
        res.json({ productos: productos })

    }

})

app.get('/productos/:id', async (req, res) => {

    const { id } = req.params
    const producto = await productManager.getProductById(JSON.parse(id))
    res.json({ producto: producto })
})


app.get('/', async (req, res) => {
    res.json('Aqui se mostraran los productos')
})





app.listen(8080, () => {

    console.log('Escuchando al puerto 8080')
})