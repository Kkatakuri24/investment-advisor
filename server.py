from http.cookiejar import Cookie, CookieJar
from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import urllib
import os
from requests.models import Response
import os.path
from http import cookies
import json
import scraper

hostName = "localhost"
serverPort = 8080
root = "."
class MyServer(BaseHTTPRequestHandler):
	def do_GET(self):
		uri = self.path
		qmark = uri.rfind('?')
		param = uri [qmark+1:]
		print(param)
		if param == "":
			value = "Unavailable"
			self.send_response(200)
			self.send_header("Content-type", 'text/plain')
			self.send_header('access-control-allow-origin', '*')
			self.end_headers()
			self.wfile.write(value.encode())
		else:
			scrapeData = scraper.scraper()
			data = scrapeData.search(param)
			self.send_response(200)
			self.send_header("Content-type", 'application/json')
			self.send_header('access-control-allow-origin', '*')
			self.end_headers()
			self.wfile.write(data.encode(encoding='utf_8'))
	def do_POST(self):
		print(self.headers)


if __name__ == "__main__":
	webServer = HTTPServer((hostName, serverPort), MyServer)
	print("Server started http://%s:%s" % (hostName, serverPort))
	try:
		webServer.serve_forever()
	except KeyboardInterrupt:
		pass

	webServer.server_close()

	print("Server stopped.")