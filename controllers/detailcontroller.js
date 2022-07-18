
const db=require('../models')
const detail=db.detail
const product=db.product
const storage=db.storage
//1.create detail
const adddetail=async(req,res)=>{
    let info ={
        id:req.body.id,
        imgURLs:req.body.imgURLs,
        description:req.body.description
    }

    const details=await detail.create(info)
    res.status(200).send(details)
    console.log(details)
}
//2.get all products
const getalldetail=async(req,res)=>{
    let details=await detail.findAll({
    })
    res.status(200).send(details)
}
//3.get single product's detail by id
const getonedetail=async(req,res)=>{
    let id=req.params.id//get id from url
    let details=await detail.findOne({where: {id: id}})
    let prod=await product.findOne({where:{id: id}})
    let amount=await storage.findAll({where:{id:id},
        attributes:[
            'id',
            'size',
            'color',
            'color_name',
            'count'
        ]
    })
    let prods={
        prod:prod,
        detail:details,
        amount:amount
    }
    res.status(200).send(prods)
}

//4.update single detail

const updatedetail=async(req,res)=>{
    let id=req.params.id
    const detail=await detail.update(req.body,{where:{id: id}})
    res.status(200).send(detail)
}
//5.delete detail by id
const deletedetail=async(req,res)=>{
    let id=req.params.id
    await detail.destory({where: {id:id}})
    res.status(200).send('detail is deleted!')
}

module.exports={
    adddetail,
    getalldetail,
    getonedetail,
    updatedetail,
    deletedetail
}