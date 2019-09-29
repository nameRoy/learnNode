const path = require('path')

module.exports={
  dbCofig:{
    host: 'localhost',
    user: 'root',
    password: 'hu1ming2xu3,',
    database: 'small_server'
  },
  httpCofig:{
    httpPort:3000,
    staticDir:path.resolve(__dirname,'../public'),
    uploadDir:path.resolve(__dirname,'../public/uploadDir')
  },
  salt:"&*#$^ashdsadcddvjup[|?"
}