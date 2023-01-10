// Hands on Lab

class ProductManager {

    constructor() {
        this.products = [];

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

        } else return console.log('ERROR: Product Not Found') // Si no existe return "Not Found"

    }

    #createId() {
        let id = 1
        if (this.products.length !== 0) {
            id = this.products[this.products.length - 1].id + 1
        }
        return id
    }

}

const productManager = new ProductManager()
productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
console.log(productManager.getProductById(2))
