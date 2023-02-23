import express from 'express'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import ProductManager from './ProductManager.js'

// Inicializo los productos
const productManager = new ProductManager()

//importar los archivos de rutas
import productosRouter from './routes/products.router.js'
import carritosRouter from './routes/carts.router.js'

const app = express()

// comandos para que entienda el formato de info que le viene
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//archivos estaticos en public
app.use(express.static(__dirname + '/public'))

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')





//ruta
app.get('/', (req, res) => {
    res.render('index')

})

app.use('/api/products', productosRouter)
app.use('/api/carts', carritosRouter)



const httpServer = app.listen(8080, () => {
    console.log('Escuchando al puerto 8080')
})

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
    const products = productManager.getProducts()
    console.log(`Usuario conectado`)
    console.log(socket.id)
    socket.emit('products', products)
    // socket.emit('products', 'Hola, aca van los productos')


    socket.on('newProduct', (obj) => {
        console.log(obj)
        const { title, description, price, status, thumbnail, code, stock, category } = { ...obj }
        productManager.addProduct(title, description, price, status, thumbnail, code, stock, category)


        socket.emit('newProductAdded', { obj })

    })

})