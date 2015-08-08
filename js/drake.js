(function(){
  var noggun,
      totalHeight,
      progress = function(){
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop,
            percentage = (scrollTop / (totalHeight - window.innerHeight));
    
        return percentage;
      },
      normalize = function(p){
        var low = -noggun.offsetHeight,
            high = window.innerHeight + noggun.offsetHeight;

        return high + (low - (high * p));
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
    noggun.style.top = normalize(progress()) + "px";
  });
})();
