import fs from 'fs'

const path = './files/carritosCompra.txt'


export default class CartsManager {


    constructor() {
        this.carts = [];
        this.existenCarritos()

    }

    existenCarritos() {
        if (fs.existsSync(path)) {
            const productosJS = fs.readFileSync(path, 'utf-8')
            this.carts = JSON.parse(productosJS)
        } else {
            fs.writeFileSync(path, JSON.stringify(this.carts))
        }
    }
    addCart() {
        const cart = {
            id: this.#createId(),
            products: [],
        }

        //Al agregarlo, debe crearse con un id automaticamente
        this.carts.push(cart);
        let cartsJSON = JSON.stringify(this.carts)
        fs.writeFileSync(path, cartsJSON)
        return true
    }

    addProduct(cid, pid) {

        //Validar que no se repita el campo "code" y que todos los campos sean obligatorios
        let existe = false
        const carrito = this.getCartById(cid)

        if (carrito.length === 0) {
            console.log(`El carrito ${cid} no existe`)
            return `El carrito ${cid} no existe`

        } else {
            if (carrito.products.length === 0) {

                let prod = {
                    product: pid,
                    quantity: 1
                }
                carrito.products.push(prod)

                let productosJSON = JSON.stringify(this.carts)
                fs.writeFileSync(path, productosJSON)
            }
            else {
                // console.log('llego a supuestamente agregar o un prod nuevo, o sumarle 1')

                let productsInCart = []
                carrito.products.forEach(prod => {
                    productsInCart.push(prod.product)
                })
                existe = productsInCart.includes(pid)
                if (!existe) {
                    let prod = {
                        product: pid,
                        quantity: 1
                    }
                    carrito.products.push(prod)
                    // this.carts[]push(carrito);
                    let productosJSON = JSON.stringify(this.carts)
                    fs.writeFileSync(path, productosJSON)
                    return true
                } else {
                    carrito.products.forEach(prod => {
                        if (prod.product === pid) {
                            prod.quantity++
                        }
                    })
                    let productosJSON = JSON.stringify(this.carts)
                    fs.writeFileSync(path, productosJSON)
                    return true

                }

            }
            //termina add product to cart
        }
    }

    getCarts() {
        return this.carts
    }

    getCartById(id) {
        let carrito = []
        this.carts.forEach(cart => {
            if (cart.id === id) {
                carrito = { ...cart }
            }

        })
        if (carrito != undefined) {
            return carrito

        } else {
            console.log('ERROR: Cart Not Found') // Si no existe return "Not Found"
            return [];
        }
    }

    #createId() {
        let id = 1
        if (this.carts.length !== 0) {
            id = this.carts[this.carts.length - 1].id + 1
        }
        return id
    }



}
