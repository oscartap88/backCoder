import { Router } from "express";
import UserDaoDB from "../daos/mongodb/user.dao.js";
import passport from "passport";
import { registerResponse, loginResponse, githubResponse} from "../controllers/user.controllers.js";
import { frontResponse } from "../passport/strategies.js";
const UserDao = new UserDaoDB()

const router = Router ()

router.post('/register',passport.authenticate('register'), registerResponse, async (req, res) =>{
    try {
        const newUser = await UserDao.createUser(req.body)
        if(newUser){
            res.redirect('/views')
        } else{
            res.redirect('/views/error-register')
        }
    } catch (error) {
       console.log(error); 
    }
});


router.post('/login',passport.authenticate('login') , loginResponse, async (req, res) => {
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

router.get('/register-github', passport.authenticate('github', { scope: ['user:email']}));

router.get('/profile-github', passport.authenticate('github', { scope: ['user:email']}), githubResponse);

export default router;