require('dotenv').config({__dirname,path: './.env'})

//console.log(process.cwd());
//console.log(process.env);
module.exports = {

      HOST: process.env.HOST,
      USER: process.env.DBUSER,
      PASSWORD: process.env.PASSWORD,
      DB: process.env.DB,
      dialect:process.env.dialect
}