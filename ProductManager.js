import fs from "fs";

export default class ProductManager{
    constructor(){
        this.path = "./Products.json";
    }
    
    getProducts = async () => {
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, "utf-8");
            const result = JSON.parse(data);
            console.log(result);
            return result;
        }else{
            return [];
            }
        }
    

        addProduct = async (code, title, description, price, thumbnail, stock) => {
       
            try {
                let products = await this.getProducts();
    
                if (!code || !title || !description || !price || !thumbnail || !stock) {
                    console.log("All the fields must be completed")
                    return;
                }
    
    
                let productRepeated = products.find((element) => element.code === code);
                if (productRepeated) {
                    return "The product is already exist";
                }
                const product = {
                    code: code,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    stock: stock,
                }
                if(products.length === 0){
                    product.id = 1
                }else{
                    product.id = products[products.length - 1].id + 1
                }
    
    
                products.push(product);
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
        }else {
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
            this.products.push(updatedProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));

            console.log("Update product");
        } catch (error) {
            console.log(error);
        }
    };
}
 