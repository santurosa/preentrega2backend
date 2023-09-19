import { cartsModel } from "../dao/db/models/carts.js";
import { productsModel } from "../dao/db/models/products.js";

export default class Carts {
    constructor() {
    }
    getCartById = async (idCart) => {
        try {
            const result = await cartsModel.findById(idCart);
            return result;
        } catch (error) {
            throw error;
        }
    }

    saveCart = async (idProduct) => {
        try {
            const result = await cartsModel.create({
                products: {
                    product: idProduct,
                    quantity: 1
                }
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    upgrateCart = async (idCart, idProduct) => {
        try {
            const isProduct = await cartsModel.findOne({ _id: idCart, "products.product": idProduct });

            if (!isProduct) {
                const result = await cartsModel.updateOne(
                    { _id: idCart },
                    {
                        $push: {
                            products: {
                                product: idProduct,
                                quantity: 1
                            }
                        }
                    }
                );
                return result;
            } else {
                const result = await cartsModel.updateOne(
                    { _id: idCart, "products.product": idProduct },
                    { $inc: { "products.$.quantity": 1 } }
                );
                return result;
            }
        } catch (error) {
            throw error;
        }
    }

}