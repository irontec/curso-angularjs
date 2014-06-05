'use strict';

var _           = require('lodash'),
    server      = require('../server'),
    config      = require('../config');

module.exports = {
    get: function (req, res) {
        res.send(config.list());
    },

	post: function (req, res) {
        _.extend(config.services, req.body.services);
        _.extend(config.templates, req.body.templates);
        server.io.sockets.emit("config", config.list());

        config.save();
        
        /*
        _.forEach(services, function (service) {
            service.configurate(config);
        });
        */

        res.send(config.list());
    }
};
