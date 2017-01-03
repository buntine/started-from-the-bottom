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
            window.scrollBy(0, 100);
          }
          else {
            killDownSong();
          }
        }, 30);

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

          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
          }

          scrollCount += 1;

          if (scrollCount > 2) {
            if (scrollCount % 20 == 0) {
              console.log("Change background...");
            }
 
            if (songUp.paused) {
              songUp.play();
              songDown.pause();
              songDown.currentTime = 0;
            }
   
            scrollTimeout = setTimeout(killUpSong, 270);
          }
        }

        noggun.style.top = normalize(currentProgress) + "px";
        previousProgress = currentProgress;
      };

  window.addEventListener("load", function(){
    var body = document.body,
        html = document.documentElement,
        loading = document.getElementById("loading");
        cont = document.getElementById("container");

    var start = document.getElementById("start");

    start.addEventListener("click", function(e){
      var song = new Audio("/sounds/drake-sftb-cut.mp3");
      song.play();
    container.style.height = "40000px";

    noggun = document.getElementById("drake");
    totalHeight = Math.max(body.scrollHeight, body.offsetHeight, 
                           html.clientHeight, html.scrollHeight, html.offsetHeight);

    noggun.style.top = window.innerHeight + "px";

    loading.remove();

    window.scrollTo(0, totalHeight);
    window.addEventListener("scroll", play);
return false;
    });

  });
})();
