var util = require('util'),
    Transport = require('./transport'),
    mysql = require('mysql');

var Mysql = function(options){
  if(!options){throw new Error('ArgumentRequired');}

  this.props = options.properties;
  this.table = options.table;
  this.pool  = mysql.createPool(options.connection);
};

util.inherits(Mysql, Transport);

Mysql.prototype.data = function(data){
  var self = this,
      log = this.formatData(data);
  this.pool.query('INSERT INTO ' + self.table + ' SET ?', log, function(err, res){
    return;
  });
};

Mysql.prototype.down = function(){
  this.pool.end();
};

Mysql.prototype.formatData = function(data){
  var self = this;
  var log = {};

  if(this.props){
    Object.keys(this.props).forEach(function(key){
      if(key !== '_'){
        log[self.props[key]] = data[key];
      }
    });
    
    if(self.props._){

      var meta = {};

      Object.keys(data).forEach(function(key){
        if(!self.props[key]){
          meta[key] = data[key];
        }
      });

      log[self.props._] = JSON.stringify(meta);
    }
  }
  else{
    log = data;
  }
  
  return log;
};

module.exports = Mysql;