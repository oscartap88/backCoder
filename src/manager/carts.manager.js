import fs from 'fs';



export default class CartsManagers{
    constructor(path){
        this.path = path;
    }

    async #getMaxId(){
        let maxId = 0;
        const carts = await this.getAllCarts();
        carts.map((prod) => {
            if(prod.id > maxId) maxId = prod.id;
        });
        return maxId;
    }
    async getAllCarts(){
        try {
            if(fs.existsSync(this.path)){
                const carts = await fs.promises.readFile(this.path, 'utf-8');
                const cartsJSON = JSON.parse(carts);
                return cartsJSON;
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getCartById(id){
        try {
            const carts = await this.getAllCarts();
            const cart = carts.find((prod) => prod.id === id);
            if(cart) {
                return cart
            }
            return false;
            
        } catch (error) {
            console.log(error);
        }
    }
    async createCart(obj){
        try {
            const cart = {
                id: await this.#getMaxId() + 1,
                ...obj
            };
            const cartsFile = await this.getAllCarts();
                cartsFile.push(cart);
                await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
                return cart;   
        } catch (error) {
            console.log(error);
        }
    }
    async updateCart(obj, id){
        try {
            const cartsFile = await this.getAllCarts(); 
            const index = cartsFile.findIndex(car => car.id === id);
            console.log('index::::',index);
            if(index === -1){
                throw new error (`Id ${id} not found`)
            } else {
                cartsFile [index] = { ...obj, id}
            }
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
        } catch (error) {
            console.log(error);
        }
    }
    async deleteCartById(id){
        try {
            const cartsFile = await this.getAllCarts(); 
            if(cartsFile.length > 0){
               const newArray = cartsFile.filter(car => car.id !== id);
               await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            } else {
                throw new error (`Product ${id} not found`)
            }
        } catch (error) {
            console.log(error);
        }
    }
    async deleteAllCarts(){
        try {
            if(fs.existsSync(this.path)){
                await fs.promises.unlink(this.path)
            }
        } catch (error) {
            console.log(error);
        }
    }
}