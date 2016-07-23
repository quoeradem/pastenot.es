// babel hook
require('babel-core/register');

const server = require('./server').default;
const config = require('./shared/config');

// start server
server.listen(process.env.port || config.port);