import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const manager = new ProductManager()

router.get("/", async (req, res) => {
    const consult = await manager.getProducts();
    let limit = Number(req.query.limit)
    if (limit) {
        const resultado = consult.slice(0, limit);
        return res
            .send(resultado);
    }
    res
        .send(consult);
});

router.get("/:pid", async (req, res) => {
    let id = req.params.pid
    const consultId = await manager.getProductById(Number.parseInt(id));
    if (!consultId) {
        return res
            .send({ error: "The product with that ID was not found" });
    } else {
        res
            .send(consultId);
    }
});

router.post("/", async (req, res) => {
    const product = req.body;
    let result = await manager.addProduct(product);

    if (result === undefined || result === null) {
        return res
            .send({ mensaje: "error" });
    } else {
        res
            .send({ mensaje: result })
    }
})

router.put("/:pid", async (req, res) => {
    const product = req.body;
    const id = req.params.pid;
    let result = await manager.updateProduct(Number(id), product);
    if (typeof (result) === "string") {
        return res
            .status(404)
            .send({ status: "error", message: "The ID entered does not exist" });
    }
    res
        .status(201)
        .send({ status: "success", mensaje: "Product updated" });
})

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;
    let result = await manager.deleteProducts(Number(id));
    res
        .send({ mensaje: result })
});

export default router;