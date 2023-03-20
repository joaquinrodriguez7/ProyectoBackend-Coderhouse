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

    addProductToCart = async (cart) => {
        try {
            const carts = await this.getCart()
            const cartExist = carts.find(c => c.id === cart.id)
            if (cartExist) {
                cartExist.quantity += cart.quantity
                await fs.promises.writeFile(this.path, JSON.stringify(carts), 'utf-8')
                return cartExist
            } else {
                const newCarts = [...carts, cart]
                await fs.promises.writeFile(this.path, JSON.stringify(newCarts), 'utf-8')
                return cart
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