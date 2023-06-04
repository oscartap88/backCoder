import MessagesDaoMongoDB from "../daos/mongodb/messages.dao.js";
const msgDaoMongo = new MessagesDaoMongoDB();

export const getAllService = async () => {
    try {
        const docs = await msgDaoMongo.getAllMessages();
        return docs;
    } catch (error) {
        console.log(error);
    }
};
export const getByIdService = async (id) => {
    try {
        const doc = await msgDaoMongo.getMessageById(id);
        if(!doc) throw new Error('Message not found')
        else return doc;
    } catch (error) {
        console.log(error);
    }
};

export const createService = async (obj) => {
    try {
        const newMsg = await msgDaoMongo.createMessage(obj);
        if(!newMsg) throw new Error('Validation Error!')
        else return newMsg;
    } catch (error) {
        console.log(error);
    }
};

export const updateService = async (id , obj) => {
    try {
        const doc = await msgDaoMongo.getMessageById(id);
        if(!doc){
            throw new Error('Message not found')
        } else{
            const msgUpd = await msgDaoMongo.updateMessage( id, obj)
            return msgUpd;
        }
       
    } catch (error) {
        console.log(error);
    }
};

export const deleteService = async (id) => {
    try {
        const msgDel = await msgDaoMongo.deleteMessage(id);
        return msgDel;
    } catch (error) {
        console.log(error);
    }
};