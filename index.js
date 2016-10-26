var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);

//返回给前端的信息
app.get("/",function(req,res){
    /*res.send('<h1>hello world</h1>');*/
    res.sendFile(__dirname+'/index.html');
});

//socket.io
io.on('connection',function(socket) {
    socket.on('chat message',function(msg){
        /*console.log('message:'+msg);*/
        //If you want to send a message to everyone except for a certain socket, we have the broadcast flag:
      /*  socket.broadcast.emit('hi');*/
        //发送信息给所有的人
        io.emit('chat message',msg);
    });

    /*socket.on('disconnect',function(){
        console.log('user disconnected');
    });*/
});
//启动服务器
http.listen(3060,function(){
    console.log("监听3060端口");
});
