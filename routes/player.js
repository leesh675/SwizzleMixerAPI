function REST_ROUTER() {
    var self = this;
}

REST_ROUTER.prototype.handleRoutes= function(router,pool,md5,fs) {

    // write file
    router.get('/player/:access' ,function(req,res){
        var temp = [{"uuid":"0754abc8-66e5-48cb-a122-7924abfeb67a","isPlaying":false,"videoId":"r7X3OYoSbeI","startSeconds":0,"endSeconds":0,"suggestedQuality":"large","title":"It's Day 12 of 12 Days!","thumbnail":"https://i.ytimg.com/vi/r7X3OYoSbeI/hqdefault.jpg"},{"uuid":"04857981-87c1-4870-af31-fa38cad61c21","isPlaying":false,"videoId":"fVe2e2cQOZA","startSeconds":0,"endSeconds":0,"suggestedQuality":"large","title":"One-of-a-Kind 12 Days Audience Reactions","thumbnail":"https://i.ytimg.com/vi/fVe2e2cQOZA/hqdefault.jpg"}];
        res.render('player', { listArray: temp});
    });
}

module.exports = REST_ROUTER;
