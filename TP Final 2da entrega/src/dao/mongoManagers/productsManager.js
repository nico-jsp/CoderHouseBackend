import { productsModel } from "../models/products.model.js";

export default class ProductsManager {

    async createProducts(productsList) {
        try {
            const products = await productsModel.create(productsList)
            return products
        } catch (error) {
            console.log(error)
        }
    }

    async getProducts() {

        try {
            const productsDB = await productsModel.find()
            return productsDB
        } catch (error) {
            return error
        }
    }
    async getProductsLimit(limit) {

        try {
            const productsDB = await productsModel.aggregate([
                {
                    '$limit': parseInt(limit)
                }
            ])
            console.log(productsDB)
            console.log('imprimi los prooductos filtrados')
            return productsDB
        } catch (error) {
            return error
        }
    }

    async getProductsOrdered(orderBy) {

        console.log(orderBy + ' aca se imprime')
        // let order
        // if (orderBy < 0) {
        //     order = -1
        // } else {
        //     order = 1
        // }
        try {
            const productsDB = await productsModel.aggregate([
                {
                    '$sort': {
                        'price': parseInt(orderBy)
                    }
                }
            ])
            console.log(productsDB)
            console.log('imprimi los prooductos filtrados')
            return productsDB
        } catch (error) {
            return error
        }
    }




    async getProductById(id) {
        try {
            const product = await productsModel.findById(id)
            return product
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
            const newProduct = await productsModel.create(product)
            return newProduct
        }
        catch (error) {
            console.log('hubo un error')
            return {}
        }

    }

}