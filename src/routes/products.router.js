import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const manager = new ProductManager()

router.get("/", (req, res) => {
    const consult = manager.getProducts();
    let limit = Number(req.query.limit)
    if (limit) {
        const resultado = consult.slice(0, limit);
        return res
            .send(resultado);
    }
    res
        .send(consult);
});

router.get("/:pid", (req, res) => {
    let id = req.params.pid
    const consultId = manager.getProductById(Number.parseInt(id));
    if (!consultId) {
        return res
            .send({ error: "The product with that ID was not found" });
    } else {
        res
            .send(consultId);
    }
});

router.post("/", (req, res) => {
    const product = req.body;
    let result = manager.addProduct(product);

    if (result === undefined || result === null) {
        return res
            .send({ mensaje: "error" });
    } else {
        res
            .send({ mensaje: result })
    }
})

router.put("/:pid", (req, res) => {
    const product = req.body;
    const id = req.params.pid;
    let result = manager.updateProduct(Number(id), product);
    if (result === null || result === undefined) {
        return res
            .send({ error: "The ID entered does not exist" });
    }
    res
        .send({ mensaje: result });
})

router.delete("/:pid", (req, res) => {
    const id = req.params.pid;
    let result = manager.deleteProducts(Number(id));
    res
        .send({ mensaje: result })
});

export default router;