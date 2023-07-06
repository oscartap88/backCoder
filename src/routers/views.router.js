import {Router} from "express";
import passport from "passport";
import { githubResponse} from "../controllers/user.controllers.js";
const router = Router ();

router.get('/',(req,res)=>{
    res.render('login')
})

router.get('/register',(req,res)=>{
    res.render('register')
})

router.get('/error-register',(req,res)=>{
    res.render('errorRegister')
})

router.get('/error-login',(req,res)=>{
    res.render('errorLogin')
})

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts')
});

//router.get('/register-github', passport.authenticate('github', { scope: ['user:email']}));
//
//router.get('/profile-github', passport.authenticate('github', { scope: ['user:email']}), githubResponse);

export default router