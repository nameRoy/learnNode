const net = require('net')

net.createServer(sock => {
  sock.once('data',buffer=>{
    console.log(buffer.toString())
  })
}).listen(3000)