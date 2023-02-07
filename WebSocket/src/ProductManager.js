import fs from 'fs'

import { __dirname } from './utils.js'

// const path = './files/productosEnStock.txt'
const path = __dirname + '/files/productosEnStock.txt'



export default class ProductManager {


    constructor() {
        this.products = [];
        this.existenProductos()

    }

    existenProductos() {
        console.log(__dirname)
        if (fs.existsSync(path)) {
            const productosJS = fs.readFileSync(path, 'utf-8')
            this.products = JSON.parse(productosJS)
            // console.log(this.products)
        } else {
            fs.writeFileSync(path, JSON.stringify(this.products))
        }
    }

    addProduct(title, description, price, status, thumbnail, code, stock, category) {
        // console.log(title, description, price, status, thumbnail, code, stock, category)
        const product = {
            id: this.#createId(),
            title,
            description,
            price,
            status,
            thumbnail,
            code,
            stock,
            category
        }
        console.log(product)
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
            let productosJSON = JSON.stringify(this.products)
            fs.writeFileSync(path, productosJSON)
            return true
        } else {

            console.log('ERROR: El codigo ya existe')
            return false
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

    existStockOfProduct(id) {
        let producto
        this.products.forEach(prod => {
            if (prod.id === id) {
                producto = { ...prod }
            }

        })

        if (producto != undefined) {
            if (producto.stock > 0) {
                producto.stock--
                this.updateProduct(id, producto)
                return true

            }

        } else {
            console.log('ERROR: Product Not Found') // Si no existe return "Not Found"
            return false;
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
            if (mods.status) {
                productoModificado.price = mods.price
            }
            if (mods.thumbnail) {
                productoModificado.thumbnail = mods.thumbnail
            }
            if (mods.stock) {
                productoModificado.stock = mods.stock
            }
            if (mods.category) {
                productoModificado.price = mods.price
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
            return true
        } else {
            console.log('ERROR: Product Not Found') // Si no existe return "Not Found"
            return false

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
            return true

        } else {
            console.log('ERROR: Product Not Found') // Si no existe return "Not Found"
            return false
        }

    }

}
