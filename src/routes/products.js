import { Router } from "express";
import Products from "../manager/products.js";

const router = Router();
const productManager = new Products();

router.get("/api/products", async (req, res) => {
    let limit = +req.query.limit;
    let page = +req.query.page;
    let sort = +req.query.sort;
    let search = req.query.search;

    limit = limit || 10;
    page = page || 1;

    console.log(limit)

    try {
        let result = await productManager.getProducts();
        result = await productManager.limit(limit);
        
        if(sort === 1 || sort === -1) {
            result = await productManager.sortPrice(sort, limit)
        };

        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
})

router.get("/api/products/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;

        const result = await productManager.getProductById(pid);
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
})

router.post("/api/products", async (req, res) => {
    try {
        const product = req.body;

        const result = await productManager.saveProducts(product);
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
})

router.delete("/api/products/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;

        const result = await productManager.deleteProduct(pid);
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
})

router.put("/api/products/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const upgrate = req.body;

        const result = await productManager.upgrateProduct(pid, upgrate);
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
})

export default router;