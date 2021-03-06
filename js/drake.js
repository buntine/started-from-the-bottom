(() => {
  let noggun,
      points,
      background,
      totalPoints = 0,
      totalHeight,
      scrollTimeout,
      scrollInterval;
      previousProgress = 0,
      scrollCount = 0;

  const 
      songUp = new Audio("/sounds/drake-sftb-cut.mp3"),
      songDown = new Audio("/sounds/drake-sftb-cut-rev.mp3"),
      progress = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop,
              percentage = (scrollTop / (totalHeight - window.innerHeight));
    
        return percentage;
      },
      normalize = (p) => {
        const low = -noggun.offsetHeight,
              high = window.innerHeight + noggun.offsetHeight;

        return high + (low - (high * p));
      },
      stop = (s) => {
        s.currentTime = 0;
        s.pause();
      },
      setIcons = (o) => {
        for (id of ["patron", "cash"]) {
          const e = document.getElementById(id);
          e.style.opacity = o;
        }
      },
      danceIcons = () => {
        if (scrollCount % 20 == 0) {
          for (id of ["patron", "cash"]) {
            const e = document.getElementById(id);
            e.classList.toggle("hey");
            e.classList.toggle("ho");
          }
        }
      },
      reset = () => {
        setPoints(-totalPoints);
        bottom();
      },
      bottom = () => {
        window.scrollTo(0, totalHeight);
      },
      setPoints = (n) => {
        if (totalPoints + n < 0) { return; }

        totalPoints += n;

        const exts = ["000,00", "000,0", "000,", "", "00", "0", ""], // Poor-mans left-padded formatting (O(1) lookup better than a loop!).
              formattedPoints = totalPoints.toLocaleString("en-US");

        points.innerHTML = exts[formattedPoints.length - 1] + formattedPoints;
      },
      positionBackground = (p) => {
        const currentPos = background.style.backgroundPosition || "0 0",
              nextPos = `0 ${parseInt(currentPos.split(" ")[1]) - p}px`;

        background.style.backgroundPosition = nextPos;
      },
      killUpSong = () => {
        scrollCount = 0;
        scrollInterval = setInterval(() => {
          if (progress() < 1) {
            setPoints(-1);
            positionBackground(14);
            window.scrollBy(0, 100);
          }
          else {
            killDownSong();
            reset();
            setIcons(0);
          }
        }, 30);

        setIcons(0);
        songDown.play();
        stop(songUp);
      },
      killDownSong = () => {
        clearInterval(scrollInterval);
        stop(songDown);
      },
      play = () => {
        const currentProgress = progress(),
              pixelOffset = normalize(currentProgress);

        // User is scrolling up.
        if (currentProgress < previousProgress) {
          scrollCount++;

          if (scrollInterval) {
            killDownSong();
          }

          // Hit top, jump down to bottom.
          if (currentProgress == 0) {
            bottom();
          }

          // Prevent bouncing issue on iPhones.
          if (scrollCount > 2) {
            if (songUp.paused) {
              songUp.play();
              killDownSong();
              setIcons(1);
            }

            danceIcons();
            positionBackground(-14);
            setPoints(1);
          }

          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(killUpSong, 270);
        }

        // Only scroll Drake down to be on-screen, not further.
        if (pixelOffset <= 18) {
          noggun.style.top = pixelOffset + "px";
        }

        previousProgress = currentProgress;
      },
      start = () => {
        const body = document.body,
              html = document.documentElement,
              cont = document.getElementById("container"),
              points_cont = document.getElementById("points");

        songUp.load();
        songDown.load();

        cont.style.height = "40000px";

        background = document.getElementById("background");
        points = document.getElementById("points_n");
        noggun = document.getElementById("drake");
        totalHeight = Math.max(body.scrollHeight, body.offsetHeight, 
                             html.clientHeight, html.scrollHeight, html.offsetHeight);

        noggun.style.top = -window.innerHeight + "px";

        points_cont.style.display = "block";
        noggun.style.display = "block"

        reset();
        window.addEventListener("scroll", play);
      },
      isMobile = () => { // Source: http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
        let check = false;

        ((a) => {if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor);

        return check;
      };

  window.addEventListener("load", () => {
    const loading = document.getElementById("loading");

    loading.remove();

    if (isMobile()) {
      const warmup = document.getElementById("warmup");

      warmup.style.display = "block"

      warmup.addEventListener("click", (e) => {
        e.preventDefault();

        warmup.remove();
        start();
      });
    } else {
      start();
    }
  });

  // Prevent endless music loop in Chrome on tab change.
  document.addEventListener("visibilitychange", reset);

  // Prevent mid-page scroll on Chrome on page refresh.
  window.addEventListener("beforeunload", reset);
})();
