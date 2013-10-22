var Transport = function(options){
  options = options || options;
  this.level = options.level;
  this.properties = options.properties;
};

Transport.prototype.add = function(filename){
  return;
};

Transport.prototype.remove = function(filename){
  return;
};

Transport.prototype.data = function(data, filename){
  return;
};

module.exports = Transport;