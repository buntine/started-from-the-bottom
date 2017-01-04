import SimpleHTTPServer
import SocketServer
import os

PORT = 8000

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

os.chdir("app")

print "serving at port", PORT
httpd.serve_forever()
