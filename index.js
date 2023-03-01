import ProductManager from "./ProductManager.js";
const manager = new ProductManager();

const operations = async () => {
    try {
        await manager.getProducts();
         let product1 = await manager.addProduct("A1", "Peras", "500gr", 100, "pera.jpg", 10)
         console.log(product1);
         let product2 = await manager.addProduct("A2", "Manzanas", "500gr", 150, "manzana.jpg", 25)
         console.log(product2)
         let product3 = await manager.addProduct("A3", "Bananas", "500gr", 200, "banana.jpg", 55)
         console.log(product3)
          let productoId= await manager.getProductById(2)
          console.log(productoId);
         let productAct = await manager.updateProduct(2, {title:"frutillas", price:"300"});
          console.log(productAct);
         let deleteproduct1 = await manager.deleteProducts(3);
         console.log(deleteproduct1)
     } catch (error) {
         console.log(error);
     }
}

operations();