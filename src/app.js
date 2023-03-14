import express from "express";
import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)


app.listen(8080, () => {
    try {
        console.log("Servidor arriba en el puerto 8080");
    } catch (error) {
        console.log(error);
    }
});

