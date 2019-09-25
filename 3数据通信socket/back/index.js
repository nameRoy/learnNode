const http = require('http')
const Server = require('socket.io')

let server = http.createServer((req,res)=>{

})
server.listen(3000,()=>{console.log('serve on 3000')})
let io = new Server(server);
io.on('connection', function (socket) {
  socket.on("sendmsg",(room,data)=>{
    socket.broadcast.to(room).emit('receive',data+'\r\n')
  })

  socket.on("joinroom",data=>{
    socket.join(data)
  })
});
