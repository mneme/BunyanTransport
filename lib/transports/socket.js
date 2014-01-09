var util = require('util'),
    Transport = require('./transport'),
    io = require('socket.io');


var Socket = function(options){
  if(!options){throw new Error('ArgumentRequired');}
  this.port = options.port;

  this.socket = io.listen(this.port);
  this.socket.on('connection', function(socket){
    socket.emit('start logging');
  });
};

util.inherits(Socket, Transport);

Socket.prototype.data = function(data) {
  this.socket.emit('data', data});
};


Socket.prototype.down = function(){
  this.socket.server.close();
}

module.exports = Socket;