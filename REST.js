var player = require("./routes/player.js");
var user = require("./routes/user.js");
var generator = require("./routes/generator.js");

function REST_ROUTER(router,pool,md5,fs) {
    var self = this;
    self.handleRoutes(router,pool,md5,fs);

    // routes
    new player().handleRoutes(router,pool,md5,fs);
    new user().handleRoutes(router,pool,md5,fs);
    new generator().handleRoutes(router,pool,md5,fs);    
}

REST_ROUTER.prototype.handleRoutes= function(router,pool,md5) {
    // router.get("/",function(req,res){
    //     res.redirect("/tool/");
    // })
}

module.exports = REST_ROUTER;
