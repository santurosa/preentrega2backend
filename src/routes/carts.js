import { Router } from "express";
import Carts from "../manager/carts.js";

const router = Router();
const cartsManager = new Carts();

router.get("/api/carts/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;

        const result = await cartsManager.getCartById(cid);
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
})

router.post("/api/carts", async (req, res) => {
    try {
        const result = await cartsManager.createCart();
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
})

router.post("/api/carts/:cid/product/:pid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;

        const result = await cartsManager.upgrateCart(cid, pid);
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
})

export default router;