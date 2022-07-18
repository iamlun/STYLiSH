const prodcontroller=require('../controllers/productcontroller.js')
const detailcontroller=require('../controllers/detailcontroller.js')
const router =require('express').Router()

router.get('/search',prodcontroller.searchprod)
router.get('/all',prodcontroller.getallprod)
router.get('/:category?',prodcontroller.getprodbycate)

router.post('/detail/add',detailcontroller.adddetail)
router.get('/detail/all',detailcontroller.getalldetail)
router.get('/detail/:id',detailcontroller.getonedetail)
module.exports=router