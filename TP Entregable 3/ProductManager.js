// Hands on Lab

// const fs = require('fs');
import fs from 'fs'
// const { parse } = require('path');
// const { stringify } = require('querystring');
const path = './files/productosEnStock.txt'


export default class ProductManager {


    constructor() {
        this.products = [];
        this.existenProductos()

    }

    existenProductos() {
        if (fs.existsSync(path)) {
            const productosJS = fs.readFileSync(path, 'utf-8')
            this.products = JSON.parse(productosJS)
            // console.log(this.products)
        } else {
            fs.writeFileSync(path, JSON.stringify(this.products))
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
            id: this.#createId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        //Validar que no se repita el campo "code" y que todos los campos sean obligatorios
        let existe = false
        let arrayCodes = []
        this.products.forEach(prod => {
            arrayCodes.push(prod.code)
        })
        existe = arrayCodes.includes(code)
        //Al agregarlo, debe crearse con un id automaticamente

        if (!existe) {
            this.products.push(product);
            // console.log(JSON.stringify(this.products))
            let productosJSON = JSON.stringify(this.products)
            // console.log(productosJSON)
            fs.writeFileSync(path, productosJSON)
        } else {
            console.log('ERROR: El codigo ya existe')
        }



    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        let producto
        this.products.forEach(prod => {
            if (prod.id === id) {
                producto = { ...prod }
            }

        })
        if (producto != undefined) {
            return producto

        } else {
            console.log('ERROR: Product Not Found') // Si no existe return "Not Found"
            // return [];
            return 'El Producto No existe';
        }
    }

    #createId() {
        let id = 1
        if (this.products.length !== 0) {
            id = this.products[this.products.length - 1].id + 1
        }
        return id
    }

    updateProduct(id, mods) {
        const productoModificado = this.getProductById(id)

        if (productoModificado) {
            if (mods.code) {
                let existe = false
                let arrayCodes = []
                this.products.forEach(prod => {
                    arrayCodes.push(prod.code)
                })
                existe = arrayCodes.includes(mods.code)
                //Al agregarlo, debe crearse con un id automaticamente

                if (!existe) {
                    productoModificado.code = mods.code
                } else {
                    console.log('ERROR: El codigo ya existe')
                }

            }
            if (mods.title) {
                productoModificado.title = mods.title
            }
            if (mods.description) {
                productoModificado.description = mods.description
            }
            if (mods.price) {
                productoModificado.price = mods.price
            }
            if (mods.thumbnail) {
                productoModificado.thumbnail = mods.thumbnail
            }
            if (mods.stock) {
                productoModificado.stock = mods.stock
            }

            let productosModificados = []
            this.products.forEach(prod => {
                if (prod.id != id) {
                    productosModificados.push(prod)
                } else {
                    productosModificados.push(productoModificado)
                }

            })
            this.products = productosModificados
            let productosJSON = JSON.stringify(this.products)
            fs.writeFileSync(path, productosJSON)
        } else {
            console.log('ERROR: Product Not Found') // Si no existe return "Not Found"

        }

    }

    deleteProduct(id) {
        let productosRestantes = []
        let existe = false
        this.products.forEach(prod => {
            if (prod.id != id) {
                productosRestantes.push(prod)
            } else {
                existe = true
            }

        })

        if (existe) {
            this.products = productosRestantes
            console.log('El producto fue eliminado')
            let productosJSON = JSON.stringify(this.products)
            fs.writeFileSync(path, productosJSON)
        } else {
            console.log('ERROR: Product Not Found') // Si no existe return "Not Found"

        }

    }

}

const productManager = new ProductManager()
// console.log(productManager.getProducts())
// productManager.addProduct('producto 5 de prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc131', 125)
// productManager.addProduct('producto prueba 6', 'Este es un producto prueba', 23, 'Sin imagen', 'abc132', 235)
// productManager.addProduct('producto prueba7', 'Este es otro producto de prueba', 230, 'Sin imagen', 'abc133', 225)
// productManager.addProduct('producto prueba8', 'Este es un producto prueba', 20, 'Sin imagenes', 'abc134', 125)
// productManager.addProduct('producto prueba9', 'Este es un producto prueba', 220, 'Sin imagen', 'abc135', 175)
// productManager.addProduct('producto prueba 10', 'Este es un producto prueba', 250, 'Sin imagenes', 'abc136', 195)
// productManager.updateProduct(3, { code: 'abc175' })


// productManager.deleteProduct(4)
// console.log(productManager.getProducts())

// console.log(productManager.getProductById(2))
