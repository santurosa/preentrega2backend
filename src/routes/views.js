import { Router } from "express";
import Products from "../manager/products.js";
import Carts from "../manager/carts.js";

const router = Router();
const productManager = new Products();
const cartsManager = new Carts();

router.get("/products", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("products", {products});
})

router.get("/carts", async (req, res) => {
    const carts = await cartsManager.getCarts();
    res.render("carts", {carts});
})

router.get("/chat", (req, res) => {
    res.render("chat", {});
})

export default router;