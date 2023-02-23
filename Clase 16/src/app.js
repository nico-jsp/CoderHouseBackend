import express from 'express'
import { Server } from 'socket.io'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import coursesRouter from './routes/courses.router.js'
import usersRouter from './routes/users.router.js'
import cartsRouter from './routes/carts.routes.js'
import productosRouter from './routes/products.routes.js'
// import ProductManager from './dao/filesManagers/productManager.js'
import ProductManager from './dao/mongoManagers/productsManager.js'

// import DBConfig
import './dao/dbConfig.js'

// Inicializo los productos
const productManager = new ProductManager()

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

//ruta
app.get('/', (req, res) => {
    res.render('index')

})

//routes
app.use('/api/products', productosRouter)
app.use('/courses', coursesRouter)
app.use('/users', usersRouter)
app.use('/views', viewsRouter)
app.use('/carts', viewsRouter)

// motor de plantilla
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})



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
        // console.log('antes de agregar')

        productManager.addProduct(title, description, price, status, thumbnail, code, stock, category)
        // console.log('dsps de agregar')

        // socket.emit('newProductAdded', { obj })

    })

})