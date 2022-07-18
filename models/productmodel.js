
module.exports=(sequelize,DataTypes)=>{
    const product=sequelize.define("product",{
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true
        },
        title:{
            type:DataTypes.STRING
        },
        imgURL:{
            type:DataTypes.TEXT
        },
        category:{
            type:DataTypes.STRING
        },
        price:{
            type:DataTypes.INTEGER
        },
        date:{
            type:DataTypes.STRING
        },
        info:{
            type:DataTypes.STRING
        }
        //freezeTableName: true
    },{freezeTableName: true},{timestamps: false})
    return product
}