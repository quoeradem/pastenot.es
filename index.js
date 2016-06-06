// babel hook
require('babel-core/register');

var server = require('./server').default;
var config = require('./shared/config');

// start server
server.listen(process.env.port || config.port);