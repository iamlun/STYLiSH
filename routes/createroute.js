
const createcontroller=require('../controllers/productcontroller.js');


const bodyParser=require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router =require('express').Router()



router.post('/',createcontroller.createproduct)

module.exports=router
