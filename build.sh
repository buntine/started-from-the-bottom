node_modules/babili/bin/babili.js js/* -d assets && \
  rm -f assets/css/app.css && \
  uglifycss css/*.css > assets/css/app.css

[ -z "$1" ] && python server.py
