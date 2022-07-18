
const path=require('path')
require('dotenv').config({__dirname,path: '../.env'})

//console.log(process.cwd());
module.exports = {

      HOST: process.env.HOST,
      USER: process.env.USER,
      PASSWORD: process.env.PASSWORD,
      DB: process.env.DB,
      dialect:process.env.dialect
}
