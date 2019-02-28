'use strict'
const http = require('http')
const https = require('https');
const httpProxy = require('http-proxy')
const fs = require('fs')

var proxy = httpProxy.createProxyServer()// create the server when proxy is called

const aPort = 80
const bPort = 443

const bOpts = {
  key: fs.readFileSync('/etc/letsencrypt/live/app.texasfirelogix.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/app.texasfirelogix.com/fullchain.pem')
}


// this creates a regular server and listens on port 80 (default web traffic port)
http.createServer((req, res) => {
  const vhost = port => proxy.web(req, res, { target: `http://localhost:${port}` })
  vhost(5151)
  // req.headers.host
}).listen(aPort,() => { console.log('http proxy listening on port ', aPort) })

https.createServer(bOpts, (req, res) => {
  const vhost = port => proxy.web(req, res, { target: `https://localhost:${port}` })
  vhost(5151)
  // req.headers.host
}).listen(bPort, () => { console.log('https proxy listening on port ', bPort) })