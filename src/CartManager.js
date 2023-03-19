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

    addProducttoCart = async (cId, pId, qty) => {
        try {
            if (isNaN(cId) || cId <= 0) {
                return `The id ${cId} of this cart has a invalid value or does not exist`
            }
            if (isNaN(pId) || pId <= 0) {
                return `The id ${pId} of this product has a invalid value or does not exist`
            }

            const carts = await this.getCart();
            const cartIdFounded = carts.findIndex((cart) => cart.id === Number(cId));

            const products = await productmanager.getProducts();
            const productIdFounded = products.findIndex((prod) => prod.id === Number(pId));
            if (cartIdFounded === -1) {
                return `The cart with the id ${cId} does not exist in the file`
            }

            if (productIdFounded === -1) {
                return `The product with the id ${pId} does not exist in the file`
            }
            let productToAdd = {}
            if (isNaN(qty) || qty <= 0) {
                productToAdd = {
                    id: Number(pId),
                    qty: 1
                };
            } else {
                productToAdd = {
                    id: Number(pId),
                    qty: Number(qty)
                };
            }

            const cartIdFound = carts.findIndex((cart) => cart.id === cId);
            const productIdFound = carts[cartIdFound].products.findIndex((prod) => prod.id === pId)
            if (cartIdFound !== -1) {
                if (productIdFound !== -1) {
                    if (isNaN(qty) || qty <= 0) {
                        carts[cartIdFound].products[productIdFound].qty++;
                    } else {
                        carts[cartIdFound].products[productIdFound].qty += Number(qty)
                    }
                } else {
                    carts[cartIdFound].products.push(productToAdd);
                }
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
                return carts;
            } else {
                return `The cart with this ID does not exist`;
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