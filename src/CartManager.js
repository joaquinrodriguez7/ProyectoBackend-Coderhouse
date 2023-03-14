import fs from "fs";
import ProductManager from "./ProductManager.js";

const manager = new ProductManager();

export default class CartManager {
    constructor() {
        this.cart = [];
        this.path = "./src/public/files/Cart.json";
    }

    getCart = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const result = JSON.parse(data);
                return result;
            } else {
                return [];
            }
        } catch (error) {
            console.error(`Error to read the file ${this.path} ${error}`);
            return [];
        }

    }

    createCart = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const result = JSON.parse(data);
                const otherCart = { id: result.length + 1, products: [] }
                result.push(otherCart)
                await fs.promises.writeFile(this.path, JSON.stringify(result, null, "\t"));
                return "Cart created";
            } else {
                const newCart = { id: this.cart.length + 1, products: [] }
                this.cart.push(newCart);
                await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, "\t"));
                return "Cart created";

            }
        } catch (error) {
            console.error(`Error to read the file ${this.path} ${error}`);
            return [];
        }
    }

    addProducttoCart = async (cId, idProd) => {
        try {
            const products = await manager.getProducts();
            let cart = await this.getCart();
            const productExistsIncart = cart.find((cartprod) => cartprod.id === cId)

            if (!productExistsIncart) {
                return "This cart does not exist";
            } else {
                let indexValue = products.find((event) => event.id === idProd);
                const resultado = productExistsIncart.products.find((prod) => prod.id === idProd)
                if (!resultado) {
                    let qty = 0
                    const productAdding = {
                        id: indexValue.id, quantity: qty
                    }
                    productExistsIncart.products.push(productAdding);
                    await fs.promises.writeFile(this.path, JSON.stringify(cart, null, "\t"));
                    return "Product added to cart";
                } else {
                    console.log(resultado.quantity)
                    const prodQuantitymodified = { id: resultado.id, "quantity": resultado.quantity + 1 }
                    console.log(productExistsIncart.products.length)
                    productExistsIncart.products[productExistsIncart.products.length - 1] = prodQuantitymodified
                    await fs.promises.writeFile(this.path, JSON.stringify(cart, null, "\t"));
                    return "Quantity modified";
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    getCartById = async (id) => {
        try {
            if (fs.existsSync(this.path)) {
                const result = await this.getCart();
                let indexValue = result.find((event) => event.id === id);
                console.log(indexValue)
                return indexValue;
            }
        } catch (error) {
            console.log(error);
        }
    }
}