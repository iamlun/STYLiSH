const dbconfig=require('/Users/lun423/Desktop/STYLiSH/config/configdb.js');
const {Sequelize,DataTypes}=require('sequelize');
const Op=Sequelize.Op;
const sequelize=new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD,{
        host:dbconfig.HOST,
        dialect:dbconfig.dialect,
        operatorsAliases:{$like: Op.like},

        // pool:{
        //     max: dbconfig.pool.max,
        //     min: dbconfig.pool.min,
        //     acquire: dbconfig.pool.acquire,
        //     idle: dbconfig.pool.idle
        // }
        define: {
            timestamps: false
        }
    }
)
sequelize.authenticate()
.then(()=>{
    console.log('connected...')
})
.catch(err=>{
    console.log('error'+err)
})
const db={}
db.Sequelize=Sequelize
db.sequelize=sequelize
db.Op=Op

db.product=require('./productmodel.js')(sequelize,DataTypes)
db.detail=require('./detailmodel.js')(sequelize,DataTypes)
db.storage=require('./storagemodel.js')(sequelize,DataTypes)
db.profile=require('./profilemodel.js')(sequelize,DataTypes)

db.sequelize.sync()//delete {force:true}
.then(()=>{
    console.log('yes re-sync done!')
})

module.exports=db



