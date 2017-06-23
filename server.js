var fs = require('fs');
var connect = require('connect');
var http = require('http');
var path = require('path');
var request = require('request');
var port = process.env.PORT || 1337;
var express = require('express');
var appExpress = express();
var appConnect = connect();
var router = express.Router();

appExpress.use(express.static(path.join(__dirname, "public")));

 var homepage = router.get("/", function (req, res) {
       
         res.sendFile("index.html");
         console.log(__dirname);
     
});

appExpress.get("/", homepage);

appExpress.listen(port);
//http.createServer(appConnect).listen(port);
console.log("Server is Running...");