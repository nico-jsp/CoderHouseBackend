import express from 'express'
import { __dirname } from './utils.js'
// import handlebars from 'express-handlebars'
// import ProductManager from '../src/ProductManager.js'

//importar los archivos de rutas
import productosRouter from '../routes/products.router.js'
import carritosRouter from '../routes/carts.router.js'

const app = express()

// Definir __dirname en utils.js

// comandos para que entienda el formato de info que le viene

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(__dirname + '/public'))

//configurar handlebars
// app.engine('handlebars', handlebards.engine)//unicamente lo hacemos para handlebars o para crear un motor de plantillas propio
app.set('views', __dirname + '/views')
// app.set('view engine', 'handlebars')


// const productManager = new ProductManager()


// rutas

app.use('/api/products', productosRouter)
app.use('/api/carts', carritosRouter)

app.get('/', async (req, res) => {
    res.json('Aqui se mostraran los productos')
})





app.listen(8080, () => {

    console.log('Escuchando al puerto 8080')
})