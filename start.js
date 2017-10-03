'use strict'
const http = require('http') // get the http module
const httpProxy = require('http-proxy') // get the proxy module
const sites = require('./sites')

var proxy = httpProxy.createProxyServer()// create the server when proxy is called

// this creates a regular server and listens on port 80 (default web traffic port)
http.createServer(function (req, res) {
// this is the virtual host function that creates a new child process using the given port
  function vhost (port) {
    proxy.web(req, res, { target: `http://localhost:${port}` })
  }

  let hostFound = false
  sites.forEach(site => {
    if (req.headers.host === site.hostname) {
      vhost(site.port)
      hostFound = true
    }
  })
  if (!hostFound) vhost(sites[0].port)
}).listen(80, function () {
  console.log('proxy listening on port 80')
})
