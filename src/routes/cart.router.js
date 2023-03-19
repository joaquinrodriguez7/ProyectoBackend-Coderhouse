import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();
const cartmanager = new CartManager()


router.post("/", async (req, res) => {
    const cart = await cartmanager.createCart();

    if (!cart) {
        return res
            .status(400)
            .send({ mensaje: "error showing cart" })
    }
    res
        .status(600)
        .send({ mensaje: cart });
})

router.get("/:cid", async (req, res) => {
    const id = req.params.cid
    const cart = await cartmanager.getCartById(Number(id));

    if (!cart) {
        return res
            .status(400)
            .send({ mensaje: "error showing cart" })
    }
    res
        .status(600)
        .send(cart);
})

router.post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const qty = req.body.qty
    const cart = await cartmanager.addProducttoCart(cid, pid, qty);

    if (typeof (cart) === "string") {
        return res
            .status(400)
            .send({ status: "error", message: cart });
    }
    return res
        .status(201)
        .send({ status: "success", message: "Product successfully added" });
})


export default router;