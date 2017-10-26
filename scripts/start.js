const http = require('http');
const config = require('../config/config');

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('I am a local webserver.');
});

server.listen(config.dev.port);