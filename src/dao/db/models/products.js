import mongoose from "mongoose";

const productCollection = "Products";

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: Array,
        default: ["Sin imagenes"]
    },
    stock: {
        type: Number,
        required: true
    },
})

export const productsModel = mongoose.model(productCollection, productsSchema);