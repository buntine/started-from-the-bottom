(function(){
  var noggun,
      totalHeight,
      scrollTimeout,
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
      };

  window.addEventListener("load", function(){
    var body = document.body,
        html = document.documentElement;

    noggun = document.getElementById("drake");
    totalHeight = Math.max(body.scrollHeight, body.offsetHeight, 
                           html.clientHeight, html.scrollHeight, html.offsetHeight);

    noggun.style.top = window.innerHeight + "px";
  });

  window.addEventListener("scroll", function(){
    if (!noggun) {
      return;
    }

    scrollCount += 1;
    noggun.style.top = normalize(progress()) + "px";

    if (song.paused) {
      song.play();
    }
    
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    if (scrollCount > 2) {
      scrollTimeout = setTimeout(killSong, 150);
    } else {
      scrollTimeout = setTimeout(killSong, 600);
    }
  });
})();
