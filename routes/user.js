var crypto      = require('crypto');
var SaltLength = 9;

function createHash(password) {
  var salt = generateSalt(SaltLength);
  var hash = md5(password + salt);
  return salt + hash;
}

function validateHash(hash, password) {
  var salt = hash.substr(0, SaltLength);
  var validHash = salt + md5(password + salt);
  return hash === validHash;
}

function generateSalt(len) {
  var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
      setLen = set.length,
      salt = '';
  for (var i = 0; i < len; i++) {
    var p = Math.floor(Math.random() * setLen);
    salt += set[p];
  }
  return salt;
}

function md5(string) {
  return crypto.createHash('md5').update(string).digest('hex');
}

function REST_ROUTER() {
    var self = this;
}

REST_ROUTER.prototype.handleRoutes= function(router,pool,md5) {
	
    router.post('/user/login' , function(req, res){
        var query = "SELECT uid, pw, email FROM ?? WHERE email = ?";
        
        var table = ["user", req.body.email, req.body.pw];
        query = mysql.format(query,table);

        pool.query(query,function(err, rows, fields){

            var errMessage = "The email address or password you entered is not valid";

            if(err) {
                res.json({"error" : true, "message" : errMessage});
            } else {
                if(rows.length == 0){
                    res.json({"error" : true, "message" : errMessage});
                    return;
                }

                var email = rows[0].email;
                var uid = rows[0].uid;

                if(validateHash(rows[0].pw, req.body.pw)){
                    var token = md5(rows + Math.random());
                    var queryUpdate = "UPDATE ?? set token=?, login=now() WHERE email = ?";
                    var params = ["user", token, req.body.email];
                    queryUpdate = mysql.format(queryUpdate,params);
                    pool.query(queryUpdate,function(err,rows){
                        if(!err) {
                            var jData = { 
                                          "redirectPath" : "/mixer/" + token,
                                          "email" : email,
                                          "uid" : uid
                                        };
                            res.json(jData);                            
                        } 
                    });

                }else{
                    res.json({"error" : true, "message" : errMessage});
                }
            }
        });
    });

    router.put('/user/signup' , function(req, res){
        var query = " INSERT INTO user(pw, email) VALUES(?, ?);";

        var hash = createHash(req.body.pw);
        var table = [hash, req.body.email];
        query = mysql.format(query,table);
        pool.query(query,function(err,rows){
            if(err) {
                res.json({"error" : true, "message" : "Email already in use"});
            } else {
                res.json({"userId" : rows.insertId});
            }
        });
    });

}

module.exports = REST_ROUTER;