function REST_ROUTER() {
    var self = this;
}

REST_ROUTER.prototype.handleRoutes= function(router,pool,md5,fs) {

    // write file
    router.post('/permitted/write' ,function(req,res){

        if(req.body.playlist && req.body.playlist.length > 0){            
            var query = " INSERT INTO playlist(uid, plist, access) VALUES(?, ?, ?);";

            var plist = JSON.stringify( req.body.playlist );
            var access = md5(req.body.playlist[0].uuid);
            var table = [req.body.uid, plist, access];
            query = mysql.format(query,table);
            pool.query(query,function(err,rows){
                if(err) {
                    res.json({"error" : true, "message" : "fail to create playlist"});
                } else {
                    // res.json({"userId" : rows.insertId});
                    res.json({"url" : "http://localhost:3000/player/" + access});
                }
            });
        }else{
            res.json({"error" : true, "message" : "fail"});
        }



        // res.json("http://54.200.139.171:3000/publish/swizzle.html");

        // var content =
        // '<meta name="viewport" content="width=device-width,initial-scale = 1,minimum-scale = 1,maximum-scale = 1,user-scalable =yes "/>' +

        // '<html>' +
        //     '<head>' +
        //         '<style>' +
        //             'body{ margin : 0px; padding : 0px; width:100%; height:100%;background-color:000000; } #player{ margin : 0px; padding : 0px;width:100%; height:100%; }' +
        //         '</style>' +
        //     '</head>' +
        //     '<body>' +
        //         '<div id="player"></div>' +
        //     '</body>' +
        //     '<script>' +
        //         'var ytPlaylist = '+ JSON.stringify(req.body)+';' +
        //         'function onYouTubeIframeAPIReady(){player=new YT.Player("player",{height:"100%",width:"100%",videoId:"",autoplay:1,events:{onReady:onPlayerReady,onStateChange:onPlayerStateChange,onError:onPlayerError}})}function onPlayerReady(t){playNext(),setInterval(function(){started&&ytNowPlaying&&0!=ytNowPlaying.endSeconds&&1==player.getPlayerState()&&ytNowPlaying.endSeconds<player.getCurrentTime()&&player.pauseVideo()},500)}function onPlayerStateChange(t){t.data==YT.PlayerState.PLAYING?started=!0:t.data==YT.PlayerState.ENDED&&started&&(ytNowPlaying=null,playNext(),started=!1)}function onPlayerError(t){ytNowPlaying=null}function stopVideo(){player.stopVideo()}function playNext(){for(var t=null,e=0;e<ytPlaylist.length;e++){var a=ytPlaylist[e];a.isPlaying&&(a.isPlaying=!1,t=ytPlaylist[e+1]?ytPlaylist[e+1]:ytPlaylist[0])}null==t&&ytNextIfDeleted&&(t=ytNextIfDeleted),null==t&&(t=ytPlaylist[0]),playVideoInPlaylist(t)}function playVideoInPlaylist(t){t&&(playingId=t.uuid,t.isPlaying=!0,ytNowPlaying=t,player.loadVideoById(t),ytNextIfDeleted=null)}var ytNowPlaying,playingId,tag=document.createElement("script"),ytNextIfDeleted;tag.src="https://www.youtube.com/iframe_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);var player,started=!1;' +
        //     '</script>' +
        // '</html>';

        // fs.writeFile('htmls/swizzle.html', content, function (err,data) {
        //   if (err){
        //     return console.log(err);
        //   } 
        //   console.log('File Writed !!!!!!!!!');
        // });
    });

}

module.exports = REST_ROUTER;