
const db=require('../models')
const product=db.product
const pdstorage=db.storage
const path2=require('path')
const multer=require('multer')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path2.extname(file.originalname))
    }
})
const upload=multer({storage: storage})

//1.create product
const createproduct=async(req,res)=>{
    console.log("test")
    console.log(req.body)
    let info ={
        id:req.body.id,
        title:req.body.title,
        imgURL:req.body.imgURL,
        category:req.body.category,
        price:req.body.price,
        date:req.body.date,
        info:req.body.info
    }
    const prod=await product.create(info)
    res.status(200).send(prod)
    console.log(prod)
}
//2.get all products 
const getallprod=async(req,res)=>{
    let paging=parseInt(req.query.paging) || 0;
    let nextpage=paging+1;
    if(nextpage===0)nextpage=null;
    let pagesize=6;
    let prods=await product.findAndCountAll({
        where: {},
        attributes:[
            'id',
            'title',
            'price',
        ],
        offset:paging*pagesize,
        limit:pagesize,
    })
    let test=await product.findAndCountAll({
        where:{}
    })
    let idtemp=[];
    for(let i=0;i<test.count;i++){
        idtemp[i]=test.rows[i].dataValues.id;
    }    
    let colors=await pdstorage.findAndCountAll({
        where:{id:idtemp},
        attributes:['id','color']
    })
    let outnum=(paging+1)*6;
    if(outnum>=prods.count){
        nextpage=null;
    }
    res.status(200).json({product: prods.rows,nextpage:`${nextpage}`,colors:colors.rows})
}


//***list API // get all products // select by category
const getprodbycate=async(req,res)=>{
    let category=req.params.category
    let paging=parseInt(req.query.paging) || 0;
    let nextpage=paging+1;
    if(nextpage===0)nextpage=null;
    let pagesize=6;
    let prods=await product.findAndCountAll({
        where:{category: category},
        offset:paging*pagesize,
        limit:pagesize,
    })
    let test=await product.findAndCountAll({
        where:{category: category}
    })
    let idtemp=[];
    for(let i=0;i<test.count;i++){
        idtemp[i]=test.rows[i].dataValues.id;
    }    
    let colors=await pdstorage.findAndCountAll({
        where:{id:idtemp},
        attributes:['id','color']
    })

    let outnum=(paging+1)*6;
    if(outnum>=prods.count){
        nextpage=null;
    }
         res.status(200).json({product: prods.rows,nextpage:`${nextpage}`,colors:colors.rows})
}
//*** search API // get all match product// select by keyword(title)
const searchprod=async(req,res)=>{

    let keyword=req.query.keyword
    let prods=await product.findAll({
        where:{title: { [db.Op.like]: `%${keyword}%` }}
    })

    res.status(200).send(prods)
}

module.exports={
    createproduct,
    getallprod,
    getprodbycate,
    searchprod
}