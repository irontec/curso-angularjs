'use strict';

var http        = require('http'),
    socketio    = require('socket.io'),
    express     = require('express'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    cookies     = require('cookie-parser'),
    multiparty  = require('connect-multiparty'),

    path        = require('path'),
    fs          = require('fs'),

    app         = express(),
    server      = http.createServer(app),
    io          = socketio.listen(server),

    config      = require('../config');

if (config.env === 'development') {
    // Inject livereload script into the response
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });
}

// development static files
if (config.env !== 'production') {
    app.use(express.static(path.join(config.rootPath, '.tmp')));
}

// app static files
app.use(express.static(config.appPath));

app.set('views', config.viewsPath);
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(morgan('dev'));
app.use(cookies(config.pass));
app.use(bodyParser.json());


// reduce socket.io's log messages
io.set('log level', 1);

server.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});

module.exports = {
    io: io,
    app: app,
    server: server
};
