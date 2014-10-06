/* jshint node: true */

"use strict";

var express = require("express"),
	serveStatic = require("serve-static"),
	app = express();

app.use(serveStatic("public/", {
	etag: true,
	index: "index.html",
	lastModified: true,
	maxAge: 604800000,
	redirect: true
}));

var server = app.listen(3000, function() {
    console.log("Listening on port %d", server.address().port);
});
