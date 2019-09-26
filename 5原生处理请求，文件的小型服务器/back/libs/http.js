const http = require('http')  // 抽出来是为了重用
const url = require('url')
const zlib = require('zlib')
const fs = require('fs')
const querystring = require('querystring')
const { Form } = require('multiparty')
const { HTTP_PORT, HTTP_ROOT, HTTP_UPLOAD } = require('../config/index')
const {findRouter} = require('./router')

let server = http.createServer((req, res) => {
  // 1.解析req，分析是请求文件还是要调用接口
  let { pathname, query } = url.parse(req.url, true)

  if (req.method == "POST") {  // post表单 或者 文件 提交
    if (req.headers["content-type"].startsWith('application/x-www-form-urlencoded')) {  // 普通表单
      let arr = [];
      req.on('data', buffer => {
        arr.push(buffer)
      })
      req.on('end', data => {
        let post = querystring.parse(Buffer.concat(arr).toString())
        handleFind(req.method,pathname,query,post,{})
      })
    } else {// 文件
      let form = new Form({
        uploadDir: HTTP_UPLOAD
      })
      form.parse(req)
      let post = {}
      let files = {}
      form.on('field', (name, val) => {
        post[name] = val
      })
      form.on('file', (name, flie) => {
        files[name] = file
      })
      form.on('error', (err) => {
        console.log(err)
      })
      form.on('close', () => {
        handleFind(req.method,pathname,query,post,files)
      })

    }

  } else {                     // 分为get请求静态文件或者请求数据 
    handleFind(req.method,pathname,query,{},{})
  }

  function handleFind(method,pathname,query,post,file){
    let fn = findRouter(method,pathname)
    if(!fn){ // 没有路由说明请求的是文件
      let filePath = HTTP_ROOT + pathname
      fs.stat(filePath,(err,stats)=>{
        if(err){
          res.writeHead(404)
          res.write('NOT FOUND')
          res.end()
        }else{
          let rs = fs.createReadStream(filePath)
          let gz = zlib.createGzip()
          rs.on('error',()=>{
          })
          res.setHeader('cotent-encoding','gzip')
          rs.pipe(gz).pipe(res)
        }
      })
    }else{
      try{
        fn(query,post,file)
      }catch(e){
        res.writeHead(500);
        res.write('Internal err')
        res.end()
      }
      
    }
  }

}).listen(HTTP_PORT, () => {
  console.log(`serve on ${HTTP_PORT}`)
})