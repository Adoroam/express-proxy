'use strict';
var http = require('http'); //get the http module
var httpProxy = require('http-proxy'); //get the proxy module

var proxy = httpProxy.createProxyServer();//create the server when proxy is called

function proxySite(hn, pn){
	this.hostname = hn;
	this.port = pn;
};
var sites = [];
//add sites here
sites[0] = new proxySite('asepdesign.com', 8001);
sites[1] = new proxySite('anthonystabile.com', 8002);

//this creates a regular server and listens on port 80 (default web traffic port)
http.createServer(function (req, res) {
    //this is the virtual host function that creates a new child process using the given port
    function vhost(port) {
        proxy.web(req, res,{
            target: 'http://localhost:'+port
        });
    };
    //this statement checks the url header to find where the request is coming from
    switch(req.headers.host) {
        case sites[0].hostname:
        vhost(sites[0].port);
        break;
        case sites[1].hostname:
        vhost(sites[1].port);
        break;
        default:
        vhost(sites[0].port);
    };

}).listen(80, function(){
    console.log("proxy listening on port 80");
});