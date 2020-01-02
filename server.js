//test enter
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, function () {
    console.log("To Environment Monitoring API, Click the Link: http://localhost:" + port);
});