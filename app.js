var express     = require("express");
var bodyParser  = require("body-parser");
var md5         = require('MD5');
var rest        = require("./REST.js");
var fs          = require('fs');
global.mysql    = require("mysql");
var app         = express();

function REST(){
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        acquireTimeout: 30000, // 30s
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : 'bonosound',
        database : 'swizzle_mixer',
        debug    :  true
    });

    // pool.getConnection(function(err,connection){
    //     if(err) {
    //       self.stop(err);
    //     } else {
    //       self.configureExpress(connection);
    //     }
    // });

    self.configureExpress(pool);
}

function isAuthenticated(req, res, next) {

    console.log("================================");
    console.log(res.url);
    console.log("================================");
    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    // if (req.user.authenticated)
        return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    // res.redirect('/#/');
}


REST.prototype.configureExpress = function(pool) {
      var self = this;
      app.use('/publish', express.static(__dirname + '/htmls'));
      app.use('/', express.static(__dirname + '/swizzle_mixer'));
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());

      // jade
      app.set('views', './views')
      app.set('view engine', 'jade');      
      app.use(express.static(__dirname + '/public'));
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
