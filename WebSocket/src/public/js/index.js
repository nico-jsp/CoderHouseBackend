const socketClient = io()

const formulario = document.getElementById('formulario-productos')
const parrafoProductos = document.getElementById('parrafoProductos')
const inputTitle = document.getElementById('title')
const inputDescription = document.getElementById('description')
const inputPrice = document.getElementById('price')
const inputStatus = document.getElementById('status')
const inputImages = document.getElementById('images')
const inputCode = document.getElementById('code')
const inputStock = document.getElementById('stock')
const inputCategory = document.getElementById('category')

socketClient.on('products', (products) => {
    console.log(products)
    let productos = ''
    // parrafoProductos = ''
    products.forEach(prod => {

        productos += `<div>
        ------------------------------------</br>
        Product: ${prod.title} </br>
        Description: ${prod.description} </br>
        Price: ${prod.price} </br>
        Status: ${prod.status} </br>
        Code: ${prod.code} </br>
        Images: ${prod.thumbnail} </br>
        Stock: ${prod.stock} </br>
        Category: ${prod.category} </br>
        ------------------------------------
        </div>
        `

    });
    parrafoProductos.innerHTML += productos
})

socketClient.on('newProductAdded', (prod) => {

    let producto = ''
    // parrafoProductos = ''
    // products.forEach(prod => {

    productos += `<div>
        ------------------------------------</br>
        Product: ${prod.title} </br>
        Description: ${prod.description} </br>
        Price: ${prod.price} </br>
        Status: ${prod.status} </br>
        Code: ${prod.code} </br>
        Images: ${prod.thumbnail} </br>
        Stock: ${prod.stock} </br>
        Category: ${prod.category} </br>
        ------------------------------------
        </div>
        `


    parrafoProductos.innerHTML += producto
})

formulario.onsubmit = (e) => {
    e.preventDefault()
    const obj = {
        title: inputTitle.value,
        description: inputDescription.value,
        price: inputPrice.value,
        status: inputStatus.value,
        code: inputCode.value,
        thumbnail: inputImages.value,
        stock: inputStock.value,
        category: inputCategory.value
    }
    console.log('se imprime el nuevo objecto')
    console.log(obj)
    socketClient.emit('newProduct', (obj))
}
