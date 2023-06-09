import MongoDao from "../mongo.dao";
import { userModel } from "../models/user.models.js";
import { createHash, isValidPassword } from "../../../path.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRECT_KEY_JWT=process.env.SECRECT_KEY_JWT;


export default class UserManager extends MongoDao{
    constructor(){
        super(userModel)
    }

    #generateToken(user){
        const payload = {
            userId: user._id,
            name: user.first_name,
            last_name: user.last_name,
            email : user.email
        }
        const token = jwt.sign(payload, SECRECT_KEY_JWT, {
            expiresIn: '10m'
        });
        return token;
    }


    async getByEmail(email){
        try {
            const existUser = await this.model.findOne({email});
            if(existUser){
                return existUser
            } else return false;
        } catch (error) {
            console.log(error);
        }
    }
    async register(user){
        try {
            const { email, password } = user;
            const existUser = await this.getByEmail(email);
            if(!existUser){
                const newUser = await this.create({...user, password: createHash(password)});
                const token = this.#generateToken(newUser);
                return token;
            } else return false;
            
        } catch (error) {
            console.log(error);
        }
    }

    async login(user){
        try {
            const { email, password } = user;
            const existUser = await this.getByEmail(email);
            if(existUser){
                const passValid = isValidPassword(existUser, password)
                if(!passValid) return false;
                else {
                    const token = this.#generateToken(existUser);
                    return token;
                }
            } return false;
        } catch (error) {
            console.log(error);
        }
    }
}