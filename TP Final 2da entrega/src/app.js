import express from 'express'
import { Server } from 'socket.io'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import usersRouter from './routes/users.router.js'
import cartsRouter from './routes/carts.routes.js'
import productosRouter from './routes/products.routes.js'
import productsRouter from './routes/productsDisplay.routes.js'
// import ProductManager from './dao/filesManagers/productManager.js'
import ProductManager from './dao/mongoManagers/productsManager.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import mongoStore from 'connect-mongo'

// import DBConfig
import './dao/dbConfig.js'

// Inicializo los productos
const productManager = new ProductManager()

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
console.log(__dirname)
app.use(express.static(__dirname + '/public'))

//manejo de cookies
const cookieKey = 'SignedCookieKey'  // Esta es una KEY para las cookies firmadas, y evitar que las modifiquen
app.use(cookieParser(cookieKey))


//Mongo Session
app.use(session({
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1200000 },
    store: new mongoStore({
        mongoUrl: 'mongodb+srv://mongo-user:mongoUserUse@cluster-dockertest.vsna5.mongodb.net/?retryWrites=true&w=majority'

    })
}))



//ruta
app.get('/', (req, res) => {
    res.render('login')

})

//routes
app.use('/products', productsRouter)
app.use('/api/products', productosRouter)
app.use('/users', usersRouter)
app.use('/views', viewsRouter)
app.use('/carts', cartsRouter)


// motor de plantilla
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')



const httpServer = app.listen(8080, () => {
    console.log('Escuchando al puerto 8080')
})

//Guardar info en cookies
app.get('/crearCookie', (req, res) => {
    // res.cookie('primeraCookie65', 'mi primera cookie 65').send('cookie guardada con exito')
    // Pasar como tercer parametro:
    // Max age {maxAge: 5000} - Tiempo en mili segundos
    // cookie firmada {signed:true}
    res.cookie('primeraCookie', 'mi primera cookie 65').send('cookie guardada con exito')

})
//Crear cookie Firmada
app.get('/crearCookie', (req, res) => {
    res.cookie('primeraCookieSigned', 'mi primera cookie 65', { signed: true }).send('cookie guardada con exito')

})


//Leer una cookie
app.get('/leerCookie', (req, res) => {
    const { primeraCookie } = req.cookies
    res.json({ cookie: primeraCookie })
})
//Leer cookie firmada
app.get('/leerSignedCookie', (req, res) => {
    const { primeraCookieSigned } = req.signedCookies
    res.json({ cookie: primeraCookieSigned })
})

// Eliminar una cookie
app.get('/borrarCookie', (req, res) => {
    res.clearCookie('primeraCookie').send('Cookie eliminada con exito')
})

//Modificar una cookie
app.get('/modificarCookie', (req, res) => {
    res.cookie('primeraCookie', 'modificada mi primera cookie 65').send('Cookie modificada con exito')
})


//Socket server
const socketServer = new Server(httpServer)

socketServer.on('connection', async (socket) => {
    const products = await productManager.getAllProducts()
    console.log(`Usuario conectado`)
    console.log(socket.id)
    socket.emit('products', products)
    // socket.emit('products', 'Hola, aca van los productos')


    socket.on('newProduct', (obj) => {
        // console.log('aca estoy en new product')
        console.log(obj)
        const { title, description, price, status, thumbnail, code, stock, category } = { ...obj }
        // console.log('antes de agregar')
        try {
            const productAdded = productManager.addProduct(title, description, price, status, thumbnail, code, stock, category)
            socket.emit('newProductAdded', { productAdded })

        } catch {
            socket.emit('errorToAddProduct', {})

        }

    })

})