var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);

//返回给前端的信息
app.get("/",function(req,res){
    /*res.send('<h1>hello world</h1>');*/
    res.sendFile(__dirname+'/index.html');

});

//监听客户端的连接
io.on('connection',function(socket) {
    //监听客户端发送的消息
    socket.on('chat message',function(msg){
        /*console.log('message:'+msg);*/
        //发送信息给所有的人
        /*io.emit('chat message',msg);*/
        //除了自己之外其他人可以接收信息
       /* socket.broadcast.emit('chat message',msg);*/
        //貌似跟io.emit没有什么区别
        /* io.sockets.emit('chat message',msg);*/
        //实现特定的一对一对话
        io.sockets.socket(socketid).emit('message', 'for your eyes only');
        //只能看到自己的
        socket.emit('chat message',msg);
    });

    /*socket.on('disconnect',function(){
        console.log('user disconnected');
    });*/
});
//启动服务器
http.listen(3060,function(){
    console.log("监听3060端口");
});
