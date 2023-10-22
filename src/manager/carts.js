import { cartsModel } from "../dao/db/models/carts.js";

export default class Carts {

    createCart = async () => {
        try {
            const result = await cartsModel.create({});
            return result;
        } catch (error) {
            throw error;
        }
    }

    getCarts = async () => {
        try {
            const result = await cartsModel.find()
            return result.map(cart => cart.toObject());
        } catch (error) {
            throw error;
        }
    }

    getCartById = async (idCart) => {
        try {
            const result = await cartsModel.findById(idCart);
            return result;
        } catch (error) {
            throw error;
        }
    }

    upgrateCart = async (idCart, idProduct) => {
        try {
            const cart = await cartsModel.findById(idCart);
            const productoExistente = cart.products.find(producto => producto.product.equals(idProduct));

            if(productoExistente) {
                await cartsModel.updateOne(
                    {
                      _id: idCart,
                      "products.product": idProduct
                    },
                    { $inc: { "products.$.quantity": 1 } }
                );    
            } else {
                await cartsModel.updateOne({ _id: idCart },
                    {
                        $push: {
                            products: {
                                product: idProduct,
                                quantity: 1
                            }
                        }
                    });
            }
            
            const result = await cartsModel.findById(idCart);
            return result;

        } catch (error) {
            throw error;
        }
    }

}