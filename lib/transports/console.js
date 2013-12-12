var util = require('util'),
    Transport = require('./Transport');
    
var Console = function(options){
  if(!options){throw new Error('ArgumentRequired');}
  this.level = options.level;
};

util.inherits(Console, Transport)

Console.prototype.data = function(data, filename){
 console.log(data, filename)
};

module.exports = Console;