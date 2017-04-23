var path = require('path');
var express = require('express');
var server = express();

var port = 3000; //We can move to environment variables later...


//If client side needs node_module packages.
server.use('/node_modules', express.static(__dirname + 'node_modules'));

//Send client side application...
server.get('/*', function(req, res){
  res.sendfile(path.join(__dirname + '/index.html'));
});

console.log('Application Started Listening on port: ', port);
server.listen(port);
