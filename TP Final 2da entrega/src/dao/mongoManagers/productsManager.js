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
    async getAllProducts() {
        try {
            const productsDB = await productsModel.find()
            return productsDB
        } catch (error) {
            return error
        }
    }

    async getProducts(limit, orderBy) {
        // let { limit, orderBy } = params
        console.log(limit)
        console.log(orderBy)
        try {
            if ((limit !== undefined) || (orderBy !== undefined)) {
                if (orderBy === undefined) {
                    orderBy = 1
                }
                const productsDB = await productsModel.aggregate([
                    {
                        '$limit': parseInt(limit)
                    },
                    {
                        '$sort': {
                            'price': parseInt(orderBy)
                        }
                    }
                ])
                return productsDB

            } else {
                const productsDB = await productsModel.find()
                return productsDB

            }
        } catch (error) {
            return error
        }
    }

    async getPages(page, limit, sort, category) {
        const productsDB = await productsModel.paginate({}, { limit, page })
        // const productsDB = await productsModel.paginate({ category: category }, { limit, page })

        console.log(productsDB);
        return productsDB

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

    async updateProduct(pid, mods) {
        const { title, description, price, status, thumbnail, code, stock, category } = mods
        try {
            const product = await productsModel.findByIdAndUpdate(pid, mods)
            return product
        }
        catch (error) {
            console.log('hubo un error')
            return {}
        }
    }




}