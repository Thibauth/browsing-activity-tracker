from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler
from json import loads, dumps
from datetime import datetime


class MyHandler(BaseHTTPRequestHandler):

    def do_POST(self):
        length = int(self.headers['Content-Length'])
        data = loads(self.rfile.read(length))
        date = datetime.utcfromtimestamp(data["time"] / 1000.)
        data["time"] = date.isoformat("T") + "Z"
        self.fh.write(dumps(data) + "\n")
        self.fh.flush()
        self.send_response(202)
        self.end_headers()
        return


if __name__ == "__main__":
    with open("browsing.log", "w") as fh:
        MyHandler.fh = fh
        server = HTTPServer(("localhost", 8080), MyHandler)
        server.serve_forever()
