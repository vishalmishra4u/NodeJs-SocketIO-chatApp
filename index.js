var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        io.emit('user disconnected');
    });
    socket.on('typing', function(data){
        console.log('typing: ' + data.name);
        io.emit('typing', data);
    });
    socket.on('user connected',function(name){
        io.emit('user connected',name);
    })
});

