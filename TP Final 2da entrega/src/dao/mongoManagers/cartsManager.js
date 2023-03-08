import { cartsModel } from "../models/carts.model.js";

export default class CartsManager {

    async createCart(cart) {
        try {
            const cart = await cartsModel.create(cart)
        } catch (error) {
            console.log(error)
        }
    }

    async getCart(id) {
        try {
            const cart = await cartsModel.find({ _id: id })
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await cartsModel.findById(cartId)
            cart.products.push(productId)
            cart.save()
            return cart
        } catch (error) {
            console.log(error)
        }
    }

}