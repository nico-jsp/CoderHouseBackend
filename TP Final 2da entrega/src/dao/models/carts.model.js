import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    cartId: {
        type: Number,
        required: true
    },
    products: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                default: []
            }
            ,
            cant:
            {
                type: Number,
                default: 0
            }
        }
    ]
})

cartsSchema.pre('find', function (next) {
    this.populate('products')
    next()
})

export const cartsModel = mongoose.model('Carts', cartsSchema)