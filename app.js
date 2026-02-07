const express= require('express');
const socketio=require('socket.io');
const http=require('http');
const path = require('path');
 

const app=express();
const server= http.createServer(app);
const io =socketio(server);

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,'public')));

io.on("connection",function(socket){
  socket.on("send-location",function(data){
    io.emit('recieve-location',{id:socket.id,...data})
  })
  console.log("connected");
  socket.on("disconnect",function(){
    io.emit("user-dissconnected",socket.id);
  })
})

app.get("/",(req,res,next)=>{
  return res.render('index')
})

server.listen(3000); 