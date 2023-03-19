import fs from "fs";

export default class ProductManager {
    constructor() {
        this.path = "./src/public/files/Productos.json";
    }

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const result = JSON.parse(data);
            console.log(result);
            return result;
        } else {
            return [];
        }
    }

    addProduct = async (product) => {
        try {
            let products = await this.getProducts();

            if (!product.code || !product.title || !product.description || !product.price || !product.thumbnail || !product.stock || !product.category) {
                console.log("All the fields must be completed")
                return;
            }

            let productRepeated = products.find((element) => element.code === product.code);
            if (productRepeated) {
                return "The product is already exist";
            }
            const productToAdded = {
                code: product.code,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                stock: product.stock,
                category: product.category,
                id: product.id,
                status: product.status,
            }
            if (products.length === 0) {
                product.id = 1
            } else {
                product.id = products[products.length - 1].id + 1
            }
            if (product.stock > 0) {
                product.status = true
            }
            products.push(productToAdded);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) => {
        try {
            if (fs.existsSync(this.path)) {
                const result = await this.getProducts();
                let indexValue = result.find((event) => event.id === id);
                if (!indexValue) {
                    return "The product does not exist";
                } else {
                    return indexValue;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    deleteProducts = async (id) => {
        const products = await this.getProducts()
        let productFound = products.find((product) => product.id === id)
        if (productFound) {
            try {
                const newProducts = products.filter((event) => event.id != id);
                this.products = newProducts;
                await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, "\t"))
                return "Removed product";
            } catch (error) {
                console.log(error);
            }
        } else {
            return "The product does not exist"
        }
    }

    updateProduct = async (id, changes) => {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const result = JSON.parse(data);
            this.products = result
            const productIndex = this.products.findIndex((product) => product.id === id);

            if (productIndex === -1) {
                console.error("Product not found");
                return;
            }
            const updatedProduct = { ...this.products[productIndex], ...changes };
            this.products[productIndex] = updatedProduct;
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
            console.log("Update product");

        } catch (error) {
            console.log(error);
        }
    };
}
