var httpProxy = require('http-proxy');
var http = require('http');
var url = require('url');
var path = require('path');
var spawn = require('child_process').spawn;

var TARGET = 'http://hello-zetta.herokuapp.com';

//
// Setup our server to proxy standard HTTP requests
//
var proxy = new httpProxy.createProxyServer({
  target: TARGET
});

var proxyServer = http.createServer(function (req, res) {
  req.headers.host = url.parse(TARGET).host;
  proxy.web(req, res);
});

proxyServer.on('upgrade', function (req, socket, head) {
  req.headers.host = url.parse(TARGET).host;
  proxy.ws(req, socket, head);
});

proxyServer.listen(1200);

var nodePath = process.argv[0];
var command = path.join('node_modules', 'npm-lazy-mirror', 'server.js');
var cacheDir = path.join('.npmcache');

var child = spawn('node', [command, 
                           '-p', '2000',
                           '-a', '192.168.7.1',
                           '-b', '192.168.7.1',
                           '--cache_dir ', cacheDir], {
                             env: process.env,
                             cwd: process.cwd
                           });


child.stdout.pipe(process.stdout);

child.stderr.on('data', function (data) {
  console.error(data);
  process.exit(1);
});

child.on('close', function (code) {
  console.log('npm proxy shutdown with code:' + code);
  process.exit(1);
});

