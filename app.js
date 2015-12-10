var express     = require("express");
var bodyParser  = require("body-parser");
var md5         = require('MD5');
var rest        = require("./REST.js");
var fs          = require('fs');
var app         = express();

function REST(){
    var self = this;
    self.configureExpress();
};

REST.prototype.configureExpress = function(pool) {
      var self = this;

      app.use('/publish', express.static(__dirname + '/htmls'));
      app.use('/tool', express.static(__dirname + '/swizzle_mixer'));
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      router.use(function (req, res, next) {

          // Website you wish to allow to connect
          res.setHeader('Access-Control-Allow-Origin', '*');

          // Request methods you wish to allow
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

          // Request headers you wish to allow
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

          // Set to true if you need the website to include cookies in the requests sent
          // to the API (e.g. in case you use sessions)
          res.setHeader('Access-Control-Allow-Credentials', true);

          // Pass to next layer of middleware
          next();
      });

      app.use('/', router);
      var rest_router = new rest(router,pool,md5,fs);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(3000,function(){
          console.log("All right ! I am alive at Port 3000.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
}

new REST();
