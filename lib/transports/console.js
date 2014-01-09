var util = require('util'),
    Transport = require('./Transport');
    
var Console = function(){
	
};

util.inherits(Console, Transport)

Console.prototype.data = function(data){
 console.log(data)
};

module.exports = Console;