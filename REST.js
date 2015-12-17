var user = require("./routes/user.js");
var resource = require("./routes/resource.js");

function REST_ROUTER(router,pool,md5,fs) {
    var self = this;
    self.handleRoutes(router,pool,md5,fs);

    // routes
    new user().handleRoutes(router,pool,md5,fs);
    new resource().handleRoutes(router,pool,md5,fs);    
}

REST_ROUTER.prototype.handleRoutes= function(router,pool,md5) {
    // router.get("/",function(req,res){
    //     res.redirect("/tool/");
    // })
}

module.exports = REST_ROUTER;
