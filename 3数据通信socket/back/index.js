const http = require('http')
const Server = require('socket.io')

let server = http.createServer((req,res)=>{

})
server.listen(3000,()=>{console.log('serve on 3000')})
let io = new Server(server);
io.on('connection', function (socket) {
  socket.on("aa",(a,b)=>{
    console.log(a+b)
  })
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});
