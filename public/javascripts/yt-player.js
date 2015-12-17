
var ytPlaylist;
var ytNowPlaying;
var playingId;
var tag = document.createElement('script');
var ytNextIfDeleted;
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//3. This function creates an <iframe> (and YouTube player)
//after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
            height : '100%',
            width : '100%',
            videoId : '',
            autoplay: 1,
            events : {
                  'onReady' : onPlayerReady,
                  'onStateChange' : onPlayerStateChange,
                  'onError': onPlayerError
            }
      });
}
//4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
//    event.target.playVideo();
      playNext();
//    chords
      setInterval(function(){
//          code for the chords playing goes here
            if(started){
                  if( ytNowPlaying
                              && ytNowPlaying.endSeconds != 0
                              && player.getPlayerState() == 1
                              && ytNowPlaying.endSeconds < player.getCurrentTime()){
                        player.pauseVideo();
                  }
            }
      },500);
}
//5. The API calls this function when the player's state changes.
//The function indicates that when playing a video (state=1),
//the player should play for six seconds and then stop.
var started = false;
function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING) {
            started = true;
      }else if(event.data  == YT.PlayerState.ENDED && started){
            ytNowPlaying = null;
            playNext();
            started = false;
      }
}
function onPlayerError(event){
      ytNowPlaying = null;
//    playNext();
}
function stopVideo() {
      player.stopVideo();
}
function playNext(){
      var ytToPlay = null;
      for( var i = 0;  i < ytPlaylist.length; i++){
            var yt = ytPlaylist[i];
            if(yt.isPlaying){
                  yt.isPlaying = false;
                  if(ytPlaylist[i + 1]){
                        ytToPlay = ytPlaylist[i + 1];
                  }else{
                        ytToPlay = ytPlaylist[0];
                  }
            }
      }
//    if it is deleted
      if(ytToPlay == null && ytNextIfDeleted){
            ytToPlay = ytNextIfDeleted;
      }
      if(ytToPlay == null){
            ytToPlay = ytPlaylist[0];
      }
      playVideoInPlaylist(ytToPlay);
}
function playVideoInPlaylist(yt){
      if(yt){
            playingId = yt.uuid;
            yt.isPlaying = true;
            ytNowPlaying = yt;
            player.loadVideoById(yt);
            ytNextIfDeleted = null;
      }
}