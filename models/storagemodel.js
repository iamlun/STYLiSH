
module.exports=(sequelize,DataTypes)=>{
    const storage=sequelize.define("storage",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true
        },
        size:{
            type:DataTypes.STRING
        },
        color:{
            type:DataTypes.STRING
        },
        count:{
            type:DataTypes.INTEGER
        }
        //freezeTableName: true
    },{freezeTableName: true},{timestamps: false})
    return storage
}