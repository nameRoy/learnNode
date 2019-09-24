const http = require('http')
const querysting = require('querystring')
// const tool = require('./tool.js')
const fs = require('fs')
const util = require('util')
const multiparty = require('multiparty');
//#region
// let server = http.createServer((req,res)=>{
//   let bufferList = []
//   let startNum = req.headers["content-type"].indexOf('; ') + 11;
//   let result = '--' + req.headers["content-type"].slice(startNum)
//   req.on('data',(data)=>{
//     bufferList.push(data)
//   })
//   req.on('end',()=>{
//     let data = Buffer.concat(bufferList) // buffer二进制数据
//     let resFirstArr = tool(data,result)
//     resFirstArr.pop()
//     resFirstArr.shift()
//     resFirstArr.forEach(item=>{
//       item = item.slice(2,item.length-2)
//       let n = item.indexOf('\r\n\r\n')
//       let key = item.slice(0,n).toString()
//       let val = item.slice(n+4)
//       if(key.indexOf('\r\n')!=-1){
//         //文件
//         let res2 = key.split('\r\n')[0].split("; ")
//         let name = res2[1].split("=")[1]
//         let fileName = res2[2].split("=")[1]
//         name = name.slice(1,name.length-1)
//         fileName = fileName.slice(1,fileName.length-1)
//         fs.writeFile(`../upload/${fileName}`,val,(err)=>{
//           if(err){
//             console.log(err)
//           }else{
//             console.log("终于成功了")
//           } 
//         })
//       }else{
//         let temp = tool(key,"=");
//         console.log(temp[1],val.toString())
//       }
//     })
//   })
// })
// server.listen(3000,()=>{
//   console.log("serve on 3000")
// })
//#endregion

let server = http.createServer((req,res)=>{
  if(req.method == "POST"){
    let form = new multiparty.Form({uploadDir:"../upload"});
    let count = 0;
    form.on('error', function(err) {
      console.log('Error parsing form: ' + err.stack);
    });
    
    form.on('file', function(name,file) {
      console.log(name,file)
    });
     
    // Close emitted after form parsed
    form.on('close', function() {
      console.log('Upload completed!');
      res.setHeader('contentType','text/plain');
      res.end("Upload completed!");
    });
     
    // Parse req
    form.parse(req);

  }
})
server.listen(3000,()=>{
  console.log("serve on 3000")
})
