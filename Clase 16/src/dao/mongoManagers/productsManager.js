import { productsModel } from "../models/products.model.js";

export default class ProductsManager {
    async getProducts() {
        try {
            const productsDB = await productsModel.find()
            return productsDB
        } catch (error) {
            return error
        }
    }

    async getProductById(id) {
        try {
            const product = await productsModel.findById(id)
        } catch (error) {
            return error
        }
    }


    async addProduct(title, description, price, status, thumbnail, code, stock, category) {
        const product = {
            // id: this.#createId(),
            title,
            description,
            price,
            status,
            thumbnail,
            code,
            stock,
            category
        }
        try {
            // console.log(product)
            console.log('Aca llega antes del existe')

            // const existeID = await productsModel.findOne(code)
            const existeID = false
            console.log('Aca llea cuando esta creando')

            console.log(existeID)

            if (!existeID) {
                console.log(product)

                const newProduct = await productsModel.create(product)
                return newProduct
            } else {
                console.log('ERROR: El codigo ya existe')
                return false
            }
        }
        catch (error) {
            return error
        }

    }

}