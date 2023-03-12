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

    let productos = ''
    // parrafoProductos = ''
    products.forEach(prod => {
        console.log(prod)
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
        <button type="PUT" onclick="location.href='http://localhost:8080/carts/640c64da42ec328aa651810e/products/${prod._id}'">Agregar al carrito</button>
        <button onClick="fetch('http://localhost:8080/carts/640c64da42ec328aa651810e/products/${prod._id}', {method: 'PUT',body: JSON.stringify({cant: 1})})">Agregar 1 al carrito</button>
        ------------------------------------
        </div>
        `

    });
    //No me funciona el boton agregar en el carrito
    parrafoProductos.innerHTML += productos
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
    console.log(obj)
    console.log('objecto enviado en el form')
    socketClient.emit('newProduct', (obj))
}
