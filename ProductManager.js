

class ProductManager {
    
    constructor(){
        this.products = [];
        
        
    }

    getProducts = () => {
        return this.products;

    }

    addProduct = (title, description,price,thumbnail,stock) =>{
        const product = {
            Id: this.#nuevoId() + 1,
            title,
            description,
            price,
            thumbnail,
            stock
        };

        
       // products.forEach((prod))if (!product.includes(title,description,price,thumbnail,stock)){
       //    return("falta completar campos")
       //}else {
       //    return (this.products.push(product) )
       //}
//
        this.products.push(product);
        
    }

    #nuevoId = () =>{
        let maxId = 0;
        this.products.map((product) =>{
            if(product.id > maxId) maxId = product.id;
        });
            return maxId;
            
    }


    getProductByld = (idProduct) => {
        const product = this.#getProduct(idProduct);
        if(product){
                if (!product.products.includes(idProduct)) product.products.push(idProduct)
        } else{
            console.log("Not found");
        }
    }
    #getProduct(idProduct){
        return this.products.find((product)=>product.id === idProduct)
    }
}

const camiseta = new ProductManager ();
camiseta.addProduct("remera","es de colo azul y rojo","150","wwww.asda.com/asd","25");
camiseta.addProduct("short","es de color amarillo y rojo","250","wwww.asda.com/asd","150");
console.log(camiseta.getProducts());
console.log(camiseta.getProductByld(5));

