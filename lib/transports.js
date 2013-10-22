function capitalize(str) {
  return str && str[0].toUpperCase() + str.slice(1);
};

var fs = require('fs'),
    path = require('path');

var transports = exports;

fs.readdirSync(path.join(__dirname, 'transports')).forEach(function (file) {
  var transport = file.replace('.js', ''),
      name  = capitalize(transport);

  if (transport === 'transport') {
    return;
  }

  transports.__defineGetter__(name, function () {
    return require('./transports/' + transport)
  });
});