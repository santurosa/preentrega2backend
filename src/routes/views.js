import { Router } from "express";
import Products from "../dao/db/products.js";
import Carts from "../dao/db/carts.js";

const router = Router();
const productManager = new Products();
const cartsManager = new Carts();

router.get("/products", async (req, res) => {
    const { limit = 10, page = 1 } = req.query;
    const { products, hasPrevPage, hasNextPage, nextPage, prevPage } = await productManager.getProducts(limit, page);
    res.render("products", { products, hasPrevPage, hasNextPage, nextPage, prevPage, limit });
})

router.get("/carts/:cid", async (req, res) => {
    const cid = req.params.cid
    const cart = await cartsManager.getCart(cid);
    res.render("carts", {cart});
})

router.get("/chat", (req, res) => {
    res.render("chat", {});
})

export default router;