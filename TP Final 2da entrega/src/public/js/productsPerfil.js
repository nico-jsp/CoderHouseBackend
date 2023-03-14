import ProductsManager from "../../dao/mongoManagers/productsManager"

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

const productManager = new ProductsManager()

const products = productManager.getAllProducts()

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

