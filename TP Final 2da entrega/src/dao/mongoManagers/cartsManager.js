import { cartsModel } from "../models/carts.model.js";

export default class CartsManager {

    async getCarts() {
        try {
            const cart = await cartsModel.find()
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async addCart() {
        const newCartId = await this.createId()
        const newCart = {
            "cartId": newCartId,
            "products": []
        }
        try {
            const cart = await cartsModel.create(newCart)
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(id) {
        try {
            const cart = await cartsModel.find({ _id: id }).populate()
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(cartId, productId, cant) {

        try {
            await cartsModel.updateOne({ "_id": cartId, "products.item": productId }, { $set: { "products.$.cant": cant } })
            const cart = cartsModel.findById(cartId)
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async addProducts(cartId, productos) {
        console.log(cartId);
        console.log(productos);
        try {
            const cart = await cartsModel.findById(cartId)
            // cart.products.push({ item: productId, cant: 1 })
            cart.products.push(...productos)
            cart.save()
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    //Elimina completamente un producto del carrito
    async deleteProductFromCart(cartId, productId) {
        console.log(cartId);
        console.log(productId);
        try {

            const cart = await cartsModel.findByIdAndUpdate({ "_id": cartId }, { $pull: { "products": { "item": productId } } })
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    //Elimina completamente todos los productos del carrito
    async deleteAllProductsFromCart(cartId) {

        console.log(cartId);
        try {
            const cart = await cartsModel.findByIdAndUpdate({ "_id": cartId }, { $set: { "products": [] } })
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async createId() {
        let id = 1
        const cart = await cartsModel.find()
        if (cart.length !== 0) {
            id = cart[cart.length - 1].cartId + 1
        }
        return id
    }

}