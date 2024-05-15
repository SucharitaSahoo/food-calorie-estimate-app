const express = require("express");
const app = express();
const {MongoClient}=require('mongodb');
const fs = require("fs");
const session = require('express-session');
const bodyparser = require('body-parser');
const port=8080;

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
const uri='mongodb+srv://neha1241be22:neha1241maiti2003@nodetuts.aua0fzk.mongodb.net/?retryWrites=true&w=majority&appName=nodetuts';
const client=new MongoClient(uri);
app.use(express.static('./main'));

app.use(session({
    secret:'secret',
    resave: false,    
    saveUninitialized:true
}))

const userAuth = (req,res,next)=>{
    
    if(req.session && req.session.user){
        next();
    }
    else{
        res.redirect('/login');
    }    
}


app.get('/',userAuth,(req,res)=>{
    
    res.sendFile('home.html',{root:'./public'}); 
})                                       

app.get('/login',(req,res)=>{
    res.sendFile('login.html',{root:'./view'}); 
})

app.post('/login',async(req,res) => {
    try{
        await client.connect();
    const db = client.db('login_demo');
    const collections = db.collection('users');
    const user = await collections.findOne(req.body);
    
    if(user)
        {
            req.session.user=user;
            
            // res.cookie('SessionId',req.sessionID);
            res.redirect('/')
        }else{
            //alert('login credentials are invalid');
            //res.redirect('/register')
            res.send('login credentials are invalid');
        }
    } catch (error) {
        console.log("Error"+error);
    }
})

app.get('/register',(req,res)=>{
    res.sendFile('register.html',{root:'./view'}); 
})

// app.get('/style.css',(req,res)=>{
//     res.sendFile('style.css',{root:'./view'}); 
// })

app.get('/fruitsimage.jpg',(req,res)=>{
    res.sendFile('fruitsimage.jpg',{root:'./view'}); 
})

app.post('/register', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('login_demo');
        const collections = db.collection('users');
        const response = await collections.insertOne(req.body);
        console.log(response);
        // res.send('User registered');
        //alert('user registered successfully');
        res.redirect('/login');
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).send("Error inserting data");
    }
})

app.get('/index',userAuth,(req,res)=>{

    res.sendFile('/index.html',{root:'./public'});
})
app.get('/diet',(req,res)=>{

    res.sendFile('/diet.html',{root:'./public'});
})
// app.get('/nutrition',(req,res)=>{

//     res.sendFile('/nutrition.html',{root:'./public'});
// })

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login'); 
})

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})