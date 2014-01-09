var Tail = require('nork-tail'),
    TransportGroup = require('./transportgroup'),
    transports = require('./transports');

var Shipper = function(dir){
  var self = this;
  this.transports = [];

  this.tail = new Tail(dir);
  this.tail
    .on('error', function(err){console.log(err);})
    .on('data', function(data, filename){self.data(data, filename);});
};

Shipper.prototype.start = function(){
  this.tail.start();
  return this;
};

Shipper.prototype.stop = function(){
  this.tail.stop();
  return this;
};

Shipper.prototype.data = function(data, logfile) {
  var parsedData;

  try
  {
    parsedData = JSON.parse(data);
  }
  catch(err)
  {
    parsedData = {data:data, level:0};
  }

  parsedData.logfile = logfile;

  this.transports.forEach(function(tran){
    tran.data(parsedData);
  });
};

Shipper.prototype.addTransport = function(tran){
  this.transports.push(tran);
  return this;
}

Shipper.prototype.removeTransport = function(tran){
  this.transports.splice(this.transports.indexOf(tran), 1);
  return this;
}

module.exports.transports = transports;
module.exports.TransportGroup = TransportGroup;
module.exports.Shipper = Shipper;