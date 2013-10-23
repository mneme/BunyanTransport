var shipper = require('./lib/shipper');
var connection = {
      protocol  : "mysql",
      host      : "localhost",
      user      : "root",
      password  : "bullfest",
      database  : "billing"
    }

var my = new shipper.transports.Mysql(
  {
    connection: connection,
    table: 'Logs',
    properties: {
      time : 'timestamp', 
      level : 'level', 
      msg: 'msg',
      _:'meta'
    }
  }
)

var smtp = {
  service: "Gmail",
  auth: {
    user: "billingdevelop@gmail.com",
    pass: "bullfest"
  }
};

var mailOptions = {
  protocol:'SMTP',
  protocolOptions:smtp,
  to:['david.olsson@softhouse.se'],
  from:'error@billing.se',
  subject:'Critical Error'
}

var s = new shipper.transports.Socket({port:8080});

var m = new shipper.transports.Mail({protocol:"SMTP", smtp:smtp});

var ship = new shipper.Shipper(process.cwd() + '/tmp');

ship
  .addTransport(my)
  .addTransport(m)
  .addTransport(s)
  .start();
