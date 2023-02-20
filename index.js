class ProductManager{
    constructor(){
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock){
        
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.#generarId(),
        }
        const existe = this.products.some(element => element.code === code)
        !existe
        ? this.products.push(product)
        : console.log("El producto ya existe")
    }

    #generarId(){
        const id =
        this.products.length === 0
        ? 1
        : this.products[this.products.length - 1].id + 1
        return id
    }

    getProducts(){
        console.log(this.products)
    }

    getProductById(id){
        const idProduct = this.products.find(element => element.id == id)
        idProduct
        ? console.log(idProduct)
        : console.log("Not found")
    }
}

const productManager = new ProductManager
productManager.getProducts()
productManager.addProduct("remera", "lisa", "200", "thumbnail", "code123", "22")
productManager.getProducts()
productManager.addProduct("campera", "rayada", "400", "thumbnail2", "code111", "21")
productManager.addProduct("pantalon", "verde", "400", "thumbnail2312", "code123", "21")
productManager.addProduct("buzo", "azul", "400", "thumbnail112", "code111", "21")
productManager.getProductById(8)
productManager.getProductById(2)
productManager.getProducts()