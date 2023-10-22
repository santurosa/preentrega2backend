import mongoose from "mongoose";

const cartCollection = "Carts";

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products",
                },
                quantity: Number,
                _id: false
            }
        ],
        default: []
    }
})

export const cartsModel = mongoose.model(cartCollection, cartsSchema);