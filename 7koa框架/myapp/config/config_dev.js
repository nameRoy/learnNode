const path = require('path')

module.exports={
  dbCofig:{
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'blog_db'
  },
  httpCofig:{
    httpPort:3000,
    staticDir:path.resolve(__dirname,'../public'),
    uploadDir:path.resolve(__dirname,'../public/uploadDir')
  },
  salt:"&*#$^ashdsadcddvjup[|?"
}