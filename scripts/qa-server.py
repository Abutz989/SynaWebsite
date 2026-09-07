"""Serve the static site with scripts blocked when the URL contains `nojs`."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        if "nojs" in self.path:
            self.send_header("Content-Security-Policy", "script-src 'none'")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


ThreadingHTTPServer(("127.0.0.1", 8081), Handler).serve_forever()
