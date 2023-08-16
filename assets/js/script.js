// SET SONG LIST
var songList = [];
songList.push(["同在同行", "參與編曲、混音", "20221212_同在同行_MMM.mp3", "be-together.jpg"]);
songList.push(["Be a Hero", "參與編曲、混音", "20230315_Be-a-Hero_MMM.mp3", "be-a-hero.jpg"]);

for (var i=0; i<6; i++){

  $("#song" + i)
    .clone()
    .attr("id", "song"+ (i+1))
    .insertAfter($("[id^=song]:last"))
    
    if (typeof songList[i] == 'undefined') {continue;}
    $("#song" + i + " .name").html(songList[i][0] + "<p>" + songList[i][1]);
    // $("#song" + i + " .portfolios-thumbnail").css("backgroung-image", "url" +songList[i][3]);
    $("#song" + i + " .portfolios-thumbnail img").attr("src", songList[i][3]);

}



// SET INITIAL AUDIO FILE

let progress = document.getElementById("player_progress")
var audio;
var songIndex = 0;
setAudio(songIndex);

function setAudio(songIndex) {
    
    $(".player-name").html(songList[songIndex][0] + "<p>" + songList[songIndex][1]);
    $(".player-thumbnail").attr("src", songList[songIndex][3]);
    audio = new Audio(songList[songIndex][2]);

    audio.currentTime = 0;
    progress.value = 0;

    var max;
    audio.onloadedmetadata = function() {
        progress.max = audio.duration;
        max = progress.max;
        progress.value = audio.currentTime;
        showSongLength();
        $("#player_currentTime").text('0:00');
    }  
    
    if(!audio.currentTime) {
        $("#current_time").text("0:00");
    }
    showCurrentTime();
}

function showSongLength() {
  var sec = parseInt(audio.duration % 60);
  var min = parseInt(audio.duration / 60);
  if (sec < 10) { sec = '0' + sec; }
  $("#player_songLength").text(min + ':' + sec);   
}


// SET MUSIC PLAYER
$("#playerbtnPause").hide();

$("#playerbtnPlay").click(function(){
    playAudio();
})

$("#playerbtnPause").click(function(){
  audio.pause();
  $("#playerbtnPause").hide();
  $("#playerbtnPlay").show();
});

function playAudio() {
  audio.play();
  $("#playerbtnPlay").hide();
  $("#playerbtnPause").show();
}


function showCurrentTime() {
  $(audio).bind('timeupdate', function(){
      var sec = parseInt(audio.currentTime % 60);
      var min = parseInt(audio.currentTime / 60);
      if (sec < 10) { sec = '0' + sec; }

      $("#player_currentTime").text(min + ':' + sec);
      
      progress.value = audio.currentTime;

  });
}


progress.onchange = function() {
  playAudio();
  audio.currentTime = progress.value;
}