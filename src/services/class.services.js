
    export default class Services {
        constructor(manager) {
            this.manager = manager;
        }
        getAll = async (page, limit ) => {
            try {
                const items = await this.manager.getAll( page, limit);
                return items;
            } catch (error) {
                console.log(error);
            }
        };
        
            getByName = async (name) => {
            try {
                const item = await this.manager.getByName(name);
                if (!item) throw new Error ("Product not found");
                else return item;
            } catch (error) {
                console.log(error);
            }
        };
        
            getAggregation = async(description)=> {
            try {
                const aggregation = await this.manager.getAggregation1(description);
                return aggregation;
            } catch (error) {
                console.log(error);
            } 
        };
        
            getById = async (id) => {
            try {
                const item = await this.manager.getById(id);
                if(!item) return false
                else return doc;
            } catch (error) {
                console.log(error);
            }
        };
        
            create = async (obj) => {
            try {
                const newItem = await this.manager.create(obj);
                if(!newItem) false;
                else return newProd;
            } catch (error) {
                console.log(error);
            }
        };
        
            update = async (id , obj) => {
            try {
                const item = await this.manager.getById(id);
                if(!item){
                    false
                } else{
                    const itemUpd = await this.manager.update( id, obj)
                    return itemUpd;
                }
               
            } catch (error) {
                console.log(error);
            }
        };
        
            delete = async (id) => {
            try {
                const itemDel = await this.manager.delete(id);
                return itemDel;
            } catch (error) {
                console.log(error);
            }
        };
    }
   