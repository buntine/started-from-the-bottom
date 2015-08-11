(function(){
  var noggun,
      totalHeight,
      scrollTimeout,
      scrollInterval,
      previousProgress = 0,
      scrollCount = 0,
      songUp = new Audio("/sounds/drake-sftb-cut.mp3"),
      songDown = new Audio("/sounds/drake-sftb-cut-rev.mp3"),
      progress = function(){
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop,
            percentage = (scrollTop / (totalHeight - window.innerHeight));
    
        return percentage;
      },
      normalize = function(p){
        var low = -noggun.offsetHeight,
            high = window.innerHeight + noggun.offsetHeight;

        return high + (low - (high * p));
      },
      killUpSong = function(){
        scrollCount = 0;
        scrollInterval = setInterval(function(){
          if (progress() < 1) {
            window.scrollBy(0, 80);
          }
          else {
            killDownSong();
          }
        }, 15);

        songUp.pause();
        songUp.currentTime = 0;

        songDown.play();
      },
      killDownSong = function(){
        clearInterval(scrollInterval);
        songDown.pause();
        songDown.currentTime = 0;
      },
      play = function(){
        var currentProgress = progress();

        if (currentProgress < previousProgress) {
          if (scrollInterval) {
            killDownSong();
          }

          if (currentProgress == 0) {
            window.scrollTo(0, totalHeight);
          }

          scrollCount += 1;

          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
          }

          if (scrollCount > 2) {
            if (songUp.paused) {
              songUp.play();
              songDown.pause();
              songDown.currentTime = 0;
            }
   
            scrollTimeout = setTimeout(killUpSong, 150);
          }
        }

        noggun.style.top = normalize(currentProgress) + "px";
        previousProgress = currentProgress;
      };

  window.addEventListener("load", function(){
    var body = document.body,
        html = document.documentElement;

    noggun = document.getElementById("drake");
    totalHeight = Math.max(body.scrollHeight, body.offsetHeight, 
                           html.clientHeight, html.scrollHeight, html.offsetHeight);

    noggun.style.top = window.innerHeight + "px";

    window.scrollTo(0, totalHeight);
    window.addEventListener("scroll", play);
  });
})();
