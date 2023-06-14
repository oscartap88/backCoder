import { Router } from "express";
import UserDaoDB from "../daos/mongodb/user.dao.js";
const UserDao = new UserDaoDB()

const router = Router ();

router.post('/register', async (req, res) =>{
    try {
        const newUser = await UserDao.createUser(req.body)
        if(newUser){
            res.redirect('/views')
        } else{
            res.redirect('/views/error-register')
        }
        return newUser
    } catch (error) {
       console.log(error); 
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserDao.loginUser(req.body);
        if(user) {
            req.session.email = email;
            req.session.password = password;
            res.redirect('/views/realTimeProducts');
        } else {
            res.redirect('/views/error-login');
        }
    } catch (error) {
      console.log(error);
    }
})

export default router;