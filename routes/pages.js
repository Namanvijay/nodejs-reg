//jshint esversion:6
const express=require('express');
const router=express.Router();
const User=require('../cores/user');
const user=new User();



router.get('/',function(req,res,next)
{
    let user=req.session.user;
    if(user)
    {
        res.render('dashboard');
        return;

    }
    res.render('welcome');
   

});

router.get('/users/login',function(req,res)
{
    res.render('login');
});
router.post('/users/login',function(req,res,next)
{
    user.login(req.body.email,req.body.password,function(result)
    {
        if(result)
        {
            req.session.user=result;
            req.session.opp=1;
            res.redirect('dashboard');
        }
        else
        {
            res.send('Username/password not correct!');
        }
    })
});
router.get('/users/register',function(req,res)
{
    res.render('register');
});
router.post('/users/register', (req, res, next) => {
   
    let userInput = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    user.create(userInput, function(lastId) {
        
        if(lastId) {
           
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('dashboard');
            });

        }else {
            console.log('Error creating a new user ...');
        }
    });

});
router.get('/dashboard', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('dashboard', {name:user.name});
        return;
    }
    res.redirect('/');
});


module.exports=router;