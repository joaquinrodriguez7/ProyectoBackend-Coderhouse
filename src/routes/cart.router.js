import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();
const cartmanager = new CartManager()


router.post("/", (req, res) => {
    const cart = cartmanager.createCart();

    if (!cart) {
        return res
            .status(400)
            .send({ mensaje: "error showing cart" })
    }
    res
        .status(600)
        .send({ mensaje: cart });
})

router.get("/:cid", (req, res) => {
    const id = req.params.cid
    const cart = cartmanager.getCartById(Number(id));

    if (!cart) {
        return res
            .status(400)
            .send({ mensaje: "error showing cart" })
    }
    res
        .status(600)
        .send(cart);
})

router.post("/:cid/product/:pid", (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const cart = cartmanager.addProducttoCart(Number(cid), Number(pid));

    if (!cart) {
        return res
            .status(400)
            .send({ mensaje: cart })
    }
    res
        .status(600)
        .send(cart);
})


export default router;