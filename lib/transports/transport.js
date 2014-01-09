//If you want to call the parent constructor.
var Transport = function(options){
  options = options || options;
};

//Will be called when data is added to tailed file.
Transport.prototype.data = function(data){
  return;
};

//When removing a transport if you need to clean up any resources.
Transport.prototype.down = function(){

}

module.exports = Transport;