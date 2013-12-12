//If you want to call the parent constructor.
var Transport = function(options){
  options = options || options;
  this.level = options.level;
  this.properties = options.properties;
};

//Will be called when a new file is added to a watched directory
Transport.prototype.add = function(filename){
  return;
};

//Will be called when a file is removed from a watched directory.
Transport.prototype.remove = function(filename){
  return;
};

//Will be called when data is added to tailed file.
Transport.prototype.data = function(data, filename){
  return;
};

//When removing a transport if you need to clean up any resources.
Transport.prototype.down = function(){

}

module.exports = Transport;