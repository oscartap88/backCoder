import {Router} from "express";
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

export default router