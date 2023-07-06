import jwt from 'jsonwebtoken';
import UserDao from '../daos/mongodb/user.dao.js';
import UserManager from '../daos/mongodb/managers/user.manager.js';
const userManager = new UserManager();
import 'dontenv/config';


//const userDao = new UserDao();

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export const generateToken = (user) =>{
    const payload = {
        userId: user._id,
        name: user.first_name,
        email: user.email
    };

    const token = jwt.sign(payload, Private_Key, {
        expiresIn: '15m'
    });
    return token;
}; 

export const checkAuth = async (req, res , next) =>{
    try {
        //const authHeader = req.headers['authorization'];
        const authHeader = req.get('authorization');
        if(!authHeader) return res.status(401).json({ msg: 'Unauthorized'});
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, SECRET_KEY_JWT);
        //const user = await userDao.getById(decode.userId);
        const user = await userManager.getById(decode.userId);
        if(!user) return res.status(401).json({ msg: 'Unauthorized'});
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
    
}