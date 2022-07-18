
//main file
const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const jwt = require('jsonwebtoken');
const app=express()
const cookieParser = require('cookie-parser');
const https = require('https');
const axios = require('axios')
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
//require .env
const tkconfig=require('/Users/lun423/Desktop/STYLiSH/config/configdb.js');


var coroption ={
    origin:true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: 'include'
} 
var newcor={
    origin:'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    
}
const path=require('path')
const multer=require('multer')
const crypto = require('crypto');
//middleware
app.use(cors())
app.set('view engine', 'ejs');
//part4 
app.get('/api/v1/admin',(req,res)=>{
    res.sendFile('product.html', { root: '.' })
})
const db=require('/Users/lun423/Desktop/STYLiSH/models')
const product=db.product
const dbstor=db.storage
const profile=db.profile
const crerouter=require('./routes/createroute.js')
let newid;
app.post('/api/v1/admin',urlencodedParser,async(req,res)=>{
    console.log(req.body.title);
    newid=req.body.id;
    let info ={
        id:req.body.id,
        title:req.body.title,
        imgURL:req.body.imgURL,
        category:req.body.category,
        price:req.body.price,
        date:req.body.date,
        info:req.body.info
    }
    let info2={
        id:req.body.id,
        size:req.body.size,
        color:req.body.color,
        count:req.body.count
    }
    const prod=await product.create(info)
    const stor=await dbstor.create(info2)
    res.status(200).sendFile('image.html',{root:'.'})
})

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        const date=new Date();
        const year=date.getFullYear();
        const mh=date.getMonth()+1;
        const day=date.getDate();
        cb(null,`${year}-`+`${mh}-`+`${day}-`+`${newid}`+`.jpg`)
    }
})

const upload=multer({storage: storage})
app.post('/api/v1/admin/image',upload.single("image"),(req,res)=>{
    res.send(`新產品 ID: ${newid} 新增成功`)
})
app.get('/api/v1/signup',(req,res)=>{
    res.sendFile('/Users/lun423/Desktop/STYLiSH/views/signup.html')
})
app.post('/api/v1/signup',urlencodedParser,async(req,res,next)=>{
        const md5 = crypto.createHash('md5');
        const hashpwd=md5.update(req.body.password).digest('hex');
        try{
            let user={
                name:req.body.name,
                email:req.body.email,
                password:hashpwd
            }
            await profile.create(user)
            res.status(200).send(`Hi ${req.body.name}, Welcome to stylish`)
        } catch(err){
            res.status(500).send('此email已註冊或格式錯誤')
        }
})
let token;
app.get('/api/v1/login',(req,res)=>{
    res.clearCookie('token')
    res.sendFile('/Users/lun423/Desktop/STYLiSH/views/login.html')
})
function generateAccessToken(useremail) {
    return jwt.sign(useremail, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
}
app.post('/api/v1/login',urlencodedParser,async(req,res,next)=>{
    const md5 = crypto.createHash('md5');
    password=md5.update(req.body.password).digest('hex');
        const verify=await profile.findOne( {where:{name: req.body.name,
                                email: req.body.email,
                                password: password}});
        if(verify==null){
            res.status(201).send({message:'LogInFailed'});
            console.log('login failed');
        }
        else{
            token = generateAccessToken({ useremail: req.body.email });
            res.status(200).cookie('token',token, {  maxAge: 90000, httpOnly: true });
            let user={user_name:req.body.name,user_emil:req.body.email};
            res.send(user);
            console.log('login succ');
        }
})
//Authenticating a Token
function verifytoken(req,res,next){
    let decoded;
    let token2=req.cookies.token
    if(token2==null){
        return res.status(201).send({message:'LogInAgain'});
    }
    decoded=jwt.verify(token2, process.env.TOKEN_SECRET)
    console.log(decoded)
    req.user=decoded
    next()
}
app.get('/api/v1/profile',verifytoken,async(req,res,next)=>{
        let member=await profile.findOne({where:{email:req.user.useremail}});
        let user={user_name:member.name,user_emil:member.email};
        res.status(200).send(user);
})
//logout
app.get('/api/v1/logout',(req,res)=>{
    res.clearCookie('token');
    res.status(200).send({message:'LogOut'});
})

//TapPay
app.get('/pay',(req,res,next)=>{
    res.sendFile('/Users/lun423/Desktop/STYLiSH/views/checkout.html')
})
app.post('/pay-by-prime',urlencodedParser,(req,res,next)=>{
    const post_data = {
        "prime": req.body.prime,
        "partner_key": "partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG",
        "merchant_id": "AppWorksSchool_CTBC",
        "amount": 1,
        "currency": "TWD",
        "details": "An apple and a pen.",
        "cardholder": {
            "phone_number": "+886923456789",
            "name": "jack",
            "email": "example@gmail.com"
        },
        "remember": false
    }

    axios.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', post_data, {
        headers: {
            'x-api-key': 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG'
        }
    }).then((response) => {
        console.log(response.data);
        return res.json({
            result: response.data
        })
    })
})
const router =require('./routes/productroute.js');
app.use('/api/v1/products',router)
const buildpath='./frontend/build';
app.use(express.static(buildpath));
app.get('*',(req,res)=>{
    console.log('send react page');
    res.sendFile(path.resolve(__dirname,buildpath,'index.html'));
})

//port
const PORT=process.env.PORT||8080
//server
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})