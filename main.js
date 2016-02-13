/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)
"use strict";
 
var cylon = require("cylon");
 
cylon.api({
  host: "10.19.187.30", // this is the IP address generated when I first set up the edison
  port: "3000", // this is the port for the API package we're using
  ssl: false
});
 
cylon.robot({
  name: "pantribot",
  connections: {
    edison: { adaptor: "intel-iot" }
  },
  devices: {
    button: { driver: "button",        pin: 2, connection: "edison" },
    screen: { driver: "upm-jhd1313m1", connection: "edison" }
  },
  // this is the main function we will call over HTTP
  // example POST is curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"message":"orange","color":"spackle"}' http://10.19.187.30:3000/api/robots/pantribot/commands/writeMessage
  // writeMessage and reset are the two commands available http://10.19.187.30:3000/api/robots/pantribot/commands
  writeMessage: function(message, color) {
    var that = this;
    var str = message.toString();
    while (str.length < 16) {
      str = str + " ";
    }
    console.log(message);
    that.screen.setCursor(0,0);
    that.screen.write(str);
    switch(color)
    {
      case "red":
        that.screen.setColor(255, 0, 0);
        break;
      case "green":
        that.screen.setColor(0, 255, 0);
        break;
      case "blue":
        that.screen.setColor(0, 0, 255);
        break;
      case "spackle":
        that.screen.setColor (255,80,172);
        break;
      default:
        that.screen.setColor(255, 255, 255);
        break;
    }
  },
  reset: function() {
    this.writeMessage("Pantri bot ready");
  },
  work: function() {
    var that = this;
    that.reset();

    that.button.on('push', function() {
      that.writeMessage("Lights On", "blue");
    });
 
    that.button.on('release', function() {
      that.reset();
    });
  }
}).start();