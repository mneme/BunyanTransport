var util = require('util'),
    Transport = require('./Transport'),
    nodemailer = require("nodemailer"),
    stringifyObject = require('stringify-object');

var Mail = function(options){
  if(!options){throw new Error('ArgumentRequired');}
  this.level = options.level;
  this.smtpTransport = nodemailer.createTransport(options.protocol, options.protocolOptions);
  this.to = options.to;
  this.from = this.from;
  this.subject = options.subject;
};

util.inherits(Mail, Transport)

Mail.prototype.data = function(data, filename){
  var mailOptions = {
    from:this.from,
    to:this.to,
    subject: this.subject,
    text: stringifyObject(data)
  };

  this.smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
    }
  });
};

module.exports = Mail;