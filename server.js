const http = require("http");
const fs = require("fs");
const url = require("url");
const etag = require("etag");

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    if (pathname === "/") {
      const data = fs.readFileSync("./index.html");
      res.end(data);
    } else if (pathname === "/images/1.png") {
      const data = fs.readFileSync("./images/1.png");
      res.writeHead(200, {
        Expires: new Date("2023-10-18 16:25:00").toUTCString(),
      });
      res.end(data);
    } else if (pathname === "/images/2.png") {
      const data = fs.readFileSync("./images/1.png");
      res.writeHead(200, {
        "Cache-Control": "max-age=100",
      });
      res.end(data);
    } else if (pathname === "/images/3.png") {
      const { mtime } = fs.statSync("./images/3.png");
      if (req.headers["if-modified-since"] == mtime.toUTCString()) {
        res.statusCode = 304;
        res.end();
        return;
      }
      const data = fs.readFileSync("./images/3.png");
      res.writeHead(200, {
        "Last-Modified": mtime.toUTCString(),
        "Cache-Control": "no-cache",
      });
      res.end(data);
    } else if (pathname === "/images/4.png") {
      const data = fs.readFileSync("./images/4.png");
      if (req.headers["if-none-match"] == etag(data)) {
        res.statusCode = 304;
        res.end();
        return;
      }
      res.writeHead(200, {
        ETag: etag(data),
        "Cache-Control": "no-cache",
      });
      res.end(data);
    } else {
      res.statusCode = 404;
      res.end();
    }
  })
  .listen(3000, () => {
    console.log("http:localhost:3000");
  });
