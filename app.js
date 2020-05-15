//jshint esversion:6
const express= require('express');
const session=require('express-session');
const path=require('path');
const pagerouter=require('./routes/pages');
const expressLayouts = require('express-ejs-layouts');
const app=express();

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

// app.set('views',path.join(__dirname,'views'));
app.use(expressLayouts);
app.set('view engine','ejs');


app.use(session(
    {
        secret:'secret',
        resave:true,
        saveUninitialized:true,
        cookie:
        {
            maxAge:60*1000*30
        }

    }
));

app.use('/',pagerouter);

app.use(function(req,res,next)
{
    var err=new Error('Page not found');
    err.status=404;
    next(err);
});

app.use(function(err,req,res,next)
{
    res.status(err.status|| 500);
    res.send(err.message);

});

app.listen(2000,function()
{
    console.log("Server is connected to port 3000");

});
module.exports=app;