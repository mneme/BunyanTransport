var util = require('util'),
    Transport = require('./transport'),
    io = require('socket.io');


var Socket = function(options){
  if(!options){throw new Error('ArgumentRequired');}
  this.level = options.level;
  this.port = options.port;

  this.socket = io.listen(this.port);
  this.socket.on('connection', function(socket){
    socket.emit('start logging');
  });
};

util.inherits(Socket, Transport);

Socket.prototype.add = function(filename) {
  this.socket.emit('add', {filename:filename});
};


Socket.prototype.remove = function(filename) {
  this.socket.emit('remove', {filename:filename});
};


Socket.prototype.data = function(data, filename) {
  this.socket.emit('data', {filename:filename, data:data});
};


Socket.prototype.down = function(){
  this.socket.server.close();
}

module.exports = Socket;