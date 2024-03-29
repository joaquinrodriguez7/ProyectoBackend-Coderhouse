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

router.post('/:cid/product/:pid', async (req, res) => {
    const objCart = {
        cid: req.params.cid,
        pid: req.params.pid,
        quantity: req.body.quantity || 1,
    }
    

    if (!quantity) {
        return res
            .status(400)
            .send({ status: 'error', error: 'invalid product format' });
    }

    const result = await cartmanager.addProductToCart(objCart);

    if (!result) {
        return res
            .status(404)
            .send({ status: 'error', error: 'cart not found' });
    }

    return res
        .status(200)
        .send({ status: 'success', data: result });
});


export default router;