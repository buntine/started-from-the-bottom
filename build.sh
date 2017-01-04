node_modules/babili/bin/babili.js js/* -d app/assets && \
  rm -f app/assets/css/app.css && \
  uglifycss css/*.css > app/assets/css/app.css

[ -z "$1" ] && python server.py
