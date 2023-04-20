const fs = require('fs');


class ProductManager {
    constructor(){
        this.path = './productos.json';
    }
    
    async createProduct(product){
        try {
            const productsFile = await this.getProducts();
            productsFile.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts(){
        try {
            if (fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path,'utf-8');
                const productsJS = JSON.parse(products);
                return productsJS;
            } else {
                return []
            }
        } catch (error) {
            console.log(error); 
        }
    }
}



const manager = new ProductManager();

const producto1 = {
    id: 1,
    title: 'arroz',
    description: 'paquete de 500 grs',
    price: 150,
    thumbnail: 'www.elarroz.com',
    stock: 15
}

const producto2 = {
    id: 1,
    title: 'fideos',
    description: 'paquete de 500 grs',
    price: 350,
    thumbnail: 'www.elfideo.com',
    stock: 45
}

const test = async() => {
    const get = await manager.getProducts();
    console.log('primer consulta', get);
    await manager.createProduct(producto1);
    const get2 = await manager.getProducts();
    console.log('segunda consulta', get2);
}

test()
