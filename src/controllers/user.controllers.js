import UserDao from "../daos/mongodb/user.dao.js";
import { generateToken } from "../jwt/auth.js";
const userDao = new UserDao();


export const registerResponse = (req, res, next)=>{
    try {
        res.json({
            msg: 'Register OK',
            session: req.session
        })
    } catch (error) {
       next (error) 
    }
};

export const loginResponse = async (req, res, next)=>{
    try {
        const user = await userDao.getById(req.session.passport.user);
        const { name , last_name , email , role} =  user;
        res.json({
            msg: 'Login OK',
            session: req.session,
            userData: {
                name,
                last_name,
                email,
                role
            }
        })
    } catch (error) {
       next (error) 
    }
};

export const githubResponse = async (req, res, next)=>{
    try {
        const { name , last_name , email , role, isGithub} =  req.user;
        res.json({
            msg: 'Register/Login Github OK',
            session: req.session,
            userData: {
                name,
                last_name,
                email,
                role,
                isGithub
            }
        })
    } catch (error) {
       next (error) 
    }
};

//export const register = async (req, res, next)=>{
//    try {
//        const { name , last_name , email , password} =  req.body;
//        const exist = await userDao.getByEmail(email);
//        if(exist) return res.status(400).json({msg: 'user already exists'});
//        const user = { name , last_name , email , password}
//        const newUser = await userDao.createUser(user);
//        const token = generateToken(newUser);
//        res.json({
//            msg: 'Register OK',
//            token
//        })
//    } catch (error) {
//        next(error);
//    }
//};
//
//export const login = async(req, res, next)=>{
//    try {
//        const { email , password } = req.body;
//        const user = await userDao.loginUser({email, password});
//        if(!user) req.json({msg: 'ivalid credentials'});
//        const access_token = generateToken(user);
//        res.header('authorization', access_token).json({msg: 'Login ok', access_token})
//        } catch (error) {
//        next(error);
//    }
//}