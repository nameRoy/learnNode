const http = require('http')
const url = require('url')
const querystring = require('querystring')
const fs = require('fs')
let userDB = {hu:123}
let server = http.createServer((req,res)=>{
  let path,username,password;
  if(req.method == "GET"){
    let {pathname,query} = url.parse(req.url,true)
    path = pathname
    username = query.username
    password = query.password
    complete(path,username,password);
  }

  function complete(path,username,password){
    if(path == "/login"){
      let msg;
      if(!userDB[username]){
        msg = "no"
        res.write(JSON.stringify({error:1,msg}))
        res.end()
      }else{
        if(userDB[username]!=password){
          msg = "incorrect"
          res.write(JSON.stringify({error:1,msg}))
          res.end()
        }else{
          msg = "success"
          res.write(JSON.stringify({error:0,msg}))
          res.end()
        }

      }
    }else if(path == "/reg"){
      let msg;
      console.log(userDB[username])
      if(!userDB[username]){
        if(username==""||password==""){
          msg = "toFull"
          res.write(JSON.stringify({error:1,msg}))
          res.end()
        }else{
          userDB[username] = password;
          msg = "reg success"
          res.write(JSON.stringify({error:0,msg}))
          res.end()
        }
      }else{
        msg = "already"
        res.write(JSON.stringify({error:1,msg}))
        res.end()
      }
    }else if(path == "/"){
      fs.readFile('../end/1-index.html',(err,data)=>{
        if(err){
          res.writeHead(404)
          res.write('not found')
          res.end()
        }else{
          res.write(data)
          res.end()
        }
      })
    }
  }
})
server.listen(3000,()=>{
  console.log("server on 3000")
})
