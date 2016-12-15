'use strict';
const express = require('express');
const base = express();
const bodyParser = require('body-parser');

function proxySite(hn, pn, df){
	this.hostname = hn;
	this.port = pn;
	if(df) {
		this.dist = df;
	}	else {
		this.dist = 'dist';
	};
	this.app = express();
};
var sites = [];
//add sites here
sites[0] = new proxySite('asepdesign.com', 8001);
sites[1] = new proxySite('hotswapheroes.com', 8002);

sites.forEach(function(ele){
	ele.app.use(express.static(ele.dist));
	ele.app.use(bodyParser.urlencoded({ extended:false }));
	ele.app.use(bodyParser.json());
	ele.app.get('/', function(req, res){
		res.redirect('/');
	});
	ele.app.get('/*', function(req, res){
		var pr = req.params["0"];
		res.redirect('/?in='+pr);
	});
});

base.listen(80, function(){
	console.log("base ready on port 80");
	sites.forEach(function(ele){
		ele.app.listen(ele.port, function(){
			console.log(ele.hostname+" listening on port: "+ele.port);
		});
	});
});