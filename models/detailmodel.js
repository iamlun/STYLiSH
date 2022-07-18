
module.exports=(sequelize,DataTypes)=>{
    const detail=sequelize.define("detail",{
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true
        },
        imgURLs:{
            type:DataTypes.TEXT
        },
        description:{
            type:DataTypes.TEXT
        },
        //freezeTableName: true
    },{freezeTableName: true},{timestamps: false})

    return detail
}