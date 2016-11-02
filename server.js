/*jshint node:true*/
'use strict';
var express = require('express');
var app = express();
var http = require('http')
var request = require('request');
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
var errorHandler = require('./utils/errorHandler')();
var four0four = require('./utils/404')();
var logger = require('morgan');
var assert = require('assert');
var port = process.env.PORT || 7203;
var routes;

var environment = process.env.NODE_ENV;

// app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compress());
app.use(logger('dev'));
app.use(cors());
app.use(errorHandler.init);


console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.get('/ping', function(req, res, next) {
    console.log(req.body);
    res.send('pong');
});

switch (environment) {
    default:
        console.log('** DEV **');
        app.use(express.static('./angular-app/'));
        //All the assets are served at this point.
        // Any invalid calls for templateUrls are under angular-app/* and should return 404
        app.use('/angular-app/*', function(req, res, next) {
            four0four.send404(req, res);
        });
        //Any deep link calls should return index.html
        app.use('/*', express.static('./angular-app/index.html'));
        break;
}
// app.get('../../app/*', function(req,res){
//   console.log(req.url);
//   var url = "http://127.0.0.1:9000/" + req.url.split("/api/")[1];
//   req.pipe(request(url)).pipe(res);
// });

// app.get('/reference-api/*', function(req,res){
//   console.log(req.url);
//   var url = "http://52.21.126.151:9002/" + req.url.split("/reference-api/")[1];
//   req.pipe(request(url)).pipe(res);
// });

// app.post('/reference-api/*', function(req,res){
//   console.log(req.url);
//   var url = "http://52.21.126.151:9002/" + req.url.split("/reference-api/")[1];
//   req.pipe(request(url)).pipe(res);
// });

// app.get('/playback-api/*', function(req,res){
//   console.log(req.url);
//   var url = "http://52.21.126.151:9004/" + req.url.split("/playback-api/")[1];
//   req.pipe(request(url)).pipe(res);
//});

app.use('/*', function (req, res) {
    res.sendFile(__dirname + '/angular-app/index.html');
});

var server = http.createServer(app);
server.listen(port, function(){
	console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});
