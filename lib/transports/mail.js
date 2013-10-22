var util = require('util'),
    Transport = require('./Transport'),
    nodemailer = require("nodemailer"),
    stringifyObject = require('stringify-object');

var Mail = function(options){
  options = options || options;
  this.level = options.level;
  this.properties = options.properties;
  this.smtpTransport = nodemailer.createTransport(options.protocol, options.smtp);
};

util.inherits(Mail, Transport)

Mail.prototype.data = function(data, filename){
  var mailOptions = {
    from:"error@itux.se",
    to:"david.olsson@softhouse.se",
    subject: 'Error',
    text: stringifyObject(data)
  };

  this.smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
    }
  });
};

module.exports = Mail;