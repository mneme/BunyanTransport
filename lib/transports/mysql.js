var util = require('util'),
    Transport = require('./transport'),
    mysql = require('mysql');

var Mysql = function(options){
  if(!options){throw new Error('ArgumentRequired');}
  this.connection = options.connection;
  this.props = options.properties;
  this.table = options.table;
  this.level = options.level;
}

util.inherits(Mysql, Transport);

Mysql.prototype.data = function(data, filename){
  var log = this.formatData(data);
  var connection = mysql.createConnection(this.connection);
  connection.query('INSERT INTO ' + this.table + ' SET ?', log, function(err, res){
    console.log(res, err);
    connection.end();
  })
}

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
      log[self.props._] = {}

      Object.keys(data).forEach(function(key){
        if(!self.props.key){
          log[self.props._][key] = data[key];
        }
      });
    }
  }
  else{
    log = data;
  }
  
  return log;
}

module.exports = Mysql;