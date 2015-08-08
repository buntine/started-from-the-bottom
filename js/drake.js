(function(){
  var noggun,
      totalHeight,
      scrollTimeout,
      previousProgress = 0,
      scrollCount = 0,
      song = new Audio("./sounds/drake-sftb-cut.mp3"),
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
      killSong = function(){
        scrollCount = 0;
        song.pause();
        song.currentTime = 0;
      },
      play = function(){
        var currentProgress = progress();

        if (currentProgress < previousProgress) {
          scrollCount += 1;
          noggun.style.top = normalize(currentProgress) + "px";

          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
          }

          if (scrollCount > 2) {
            if (song.paused) {
              song.play();
            }
   
            scrollTimeout = setTimeout(killSong, 150);
          }
        }

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
