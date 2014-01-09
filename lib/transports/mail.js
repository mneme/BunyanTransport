var util = require('util'),
    Transport = require('./Transport'),
    nodemailer = require("nodemailer"),
    stringifyObject = require('stringify-object');

var Mail = function(options){
  if(!options){throw new Error('ArgumentRequired');}
  this.smtpTransport = nodemailer.createTransport(options.protocol, options.protocolOptions);
  this.options = options;
};

util.inherits(Mail, Transport)

Mail.prototype.data = function(data){
  var mailOptions = {
    from:this.options.from,
    to:this.options.to,
    subject: this.options.subject,
    text: this.options.text || stringifyObject(data)
  };

  this.smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
    }
  });
};

module.exports = Mail;