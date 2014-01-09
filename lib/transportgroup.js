TransportGroup = function(){
	this.transports = [];
	this.filters = [];
}

TransportGroup.prototype.addTransport = function(transport){
  this.transports.push(transport);
  return this;
};

TransportGroup.prototype.removeTransport = function(transport) {
  var t = this.transports.splice(this.transports.indexOf(transport),1);
  t.down();
  return this;
};

TransportGroup.prototype.addFilter = function(fun){
  this.filters.push(fun);
  return this;
};

TransportGroup.prototype.removeFilter = function(fun) {
  this.transports.splice(this.transports.indexOf(fun),1);
  return this;
};

TransportGroup.prototype.clear = function(){
	this.transports.forEach(function(tran){
		tran.down();
	});
	this.transports = [];
	this.filters = [];
	return this;
}

TransportGroup.prototype.data = function(data){
	var self = this,
			index = 0;

	function next(err, data){
		if(err){return console.log(err);}

		var filter = self.filters[index];

		if(filter){
			
			process.nextTick(function(){
				filter(data, next);
			});
			
			index = index + 1;
		}
		else{
			self.send(data);
		}
	}

	next(null, data);
}

TransportGroup.prototype.send = function(data){
	this.transports.forEach(function(tran){
		tran.data(data);
	});
}

module.exports = TransportGroup;