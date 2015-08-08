(function(){
  var noggun, totalHeight;

  var position = function(){
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop,
        progress = (scrollTop / (totalHeight - window.innerHeight));
    
    return progress;
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

    console.log(position());
  });
})();
