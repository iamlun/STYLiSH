
module.exports=(sequelize,DataTypes)=>{
    const profile=sequelize.define("profile",{
        email:{
            type:DataTypes.STRING,
            primaryKey: true,
            validate:{
                isEmail: true
            }
        },
        name:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        }
        //freezeTableName: true
    },{freezeTableName: true},{timestamps: false})
    return profile
}