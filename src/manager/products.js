import { productsModel } from "../dao/db/models/products.js";

export default class Products {
    contructor() {
    }

    getProducts = async () => {
        try {
            const users = await productsModel.find()
            return users.map(product => product.toObject());
        } catch (error) {
            throw error;
        }
    }

    sortPrice = async (sort, limit) => {
        const filter = await productsModel.aggregate([
            {
                $sort: {price: sort}
            },
            {
                $limit: limit
            }
        ]);
        return filter;
    }

    limit = async (limit) => {
        const filter = await productsModel.aggregate([
            {
                $limit: limit
            }
        ]);
        return filter;
    }

    getProductById = async (idProduct) => {
        try {
            const result = await productsModel.findById(idProduct);
            return result;
        } catch (error) {
            throw error;
        }
    }

    saveProducts = async (product) => {
        try {
            const result = await productsModel.create(product);
            return result;
        } catch (error) {
            throw error;
        }
    }

    deleteProduct = async (idProduct) => {
        try {
            const result = await productsModel.deleteOne({ _id: idProduct });
            return result;
        } catch (error) {
            throw error;
        }
    }

    upgrateProduct = async (idProduct, upgrate) => {
        try {
            const result = await productsModel.updateOne({ _id: idProduct }, upgrate);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
