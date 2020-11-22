var Gun = require('gun');

var server = require('http').createServer().listen(8082);
var gun = Gun({web: server});
