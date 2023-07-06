
export default class MongoDao {
    constructor(model){
        this.model = model
    }
    async getAll( page = 1, limit = 10){
        try {
            const response = await this.model.paginate({}, { page , limit });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    

    async getByName(name){
        try {
            const response = await this.model.find({name : name}).explain()
            return response.executionStats;
        } catch (error) {
            console.log(error);
        }
    }



    async getAggregation1(description){
        try {
            const response = await this.model.aggregate([
                {
                    $match: { description: `${description}` }
                }
            ])
            return response;
        } catch (error) {
           console.log(error);
        }
    }

    async getById(id){
        try {
            const response = await this.model.findById(id);
            return response.populate('carts');
        } catch (error) {
            console.log(error);
        }
    }


    
  
    async create(obj){
        try {
            const response = await this.model.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj){
        try {
            await this.model.updateOne({_id: id},obj);
            return obj;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id){
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

}