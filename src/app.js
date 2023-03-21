import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRoutes from "./routes/views.routes.js"

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)
app.use(express.static(`${__dirname}/public`));
app.use("/", viewsRoutes)

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set("views", `${__dirname}/views`);

app.listen(8080, () => {
    try {
        console.log("Servidor arriba en el puerto 8080");
    } catch (error) {
        console.log(error);
    }
});

