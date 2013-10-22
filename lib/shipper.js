var Tail = require('nork-tail'),
    transports = require('./transports');

var filter = /^[^\.]*.$/;

var Shipper = function(dir){
  this.transports = [];
  var self = this;
  this.tail = new Tail(dir,{filter:filter, delimiter:'\n'})
  this.tail
    .on('error', function(err){console.log(err);})
    .on('data', function(data, filename){self.data(data, filename)})
    .on('watch', function(filename){self.add(filename);})
    .on('unwatch', function(filename){self.remove(filename);})
    .start();
};

Shipper.prototype.addTransport = function(transport){
  this.transports.push(transport);
  return this;
};

Shipper.prototype.removeTransport = function(transport) {
  this.transports.splice(this.transports.indexOf(transport),1);
  return this;
};

Shipper.prototype.start = function(){
  this.tail.start();
  return this;
};

Shipper.prototype.stop = function(){
  this.tail.stop();
  return this;
};

Shipper.prototype.data = function(data, filename) {
  var data = JSON.parse(data);
  this.transports.forEach(function(s){
    s.data(data, filename);
  });
};

Shipper.prototype.add = function(filename){
  this.transports.forEach(function(s){
    s.add(filename);
  });
};

Shipper.prototype.remove = function(filename){
  this.transports.forEach(function(s){
    s.remove(filename);
  });
};

module.exports.transports = transports;
module.exports.Shipper = Shipper;