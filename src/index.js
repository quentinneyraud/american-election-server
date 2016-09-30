var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8080);

io.on('connection', function (socket) {

  socket.on('join-room', function (datas) {
    socket.join(datas.roomId, () => {
      socket.emit('room-joined')
    })

    if (datas.from === 'mobile') {
      socket.broadcast.to(datas.roomId).emit('can-start')
      socket.emit('can-start')
    }
  });

  socket.on('orientation-to-server', (datas) => {
    socket.broadcast.to(datas.roomId).emit('orientation-to-client', {datas: datas.motionDatas})
  })
});
