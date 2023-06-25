import UserDao from "../daos/mongodb/user.dao.js";
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