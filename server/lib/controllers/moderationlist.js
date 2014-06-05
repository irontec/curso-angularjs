'use strict';
/*
var _           = require('lodash'),
    express     = require('express'),
    
    server      = require('../server'),
    config      = require('../config'),
    
    Twit        = require('../models/twit'),
    RestList    = require('./restlist');

var pendingtwits;

// Twit list
var NewList = RestList.extend({
    name: "new",
    onAdd: function (obj) {
        if (this.size >= config.services.twitter.entrylimit) {
            this.remove(this.first());
        }
    },
    onUpdate: function (obj) {
        this.remove(obj);
        this.lists.pendingList.add(obj);
    }
});

var ShownList = NewList.extend({
    name: "shown"
});

var PendingList = RestList.extend({
    name: "pending",
    exportRest: ["index", "destroy", "show"],
    initialize: function () {
        this.shown = null;
        this.showTwit();
    },
    add: function (twit) {
        if (this.shown) {
            this.constructor.__super__.add.apply(this, arguments);
        } else {
            this.shown = twit;
            this.timeout();
        }
    },
    showTwit: function () {
        if (this.size === 0) {
            this.shown = null;
            this.socket(null);
        } else {
            this.shown = this.first();
            this.remove(this.shown);
            this.timeout();
        }
    },
    socket: function (obj) {
        server.io.sockets.emit(this.service.name + 'show', obj.toJSON());
    },
    timeout: function () {
        this.socket(this.shown);
        clearTimeout(this.pendingTimeout);
        this.pendingTimeout = setTimeout(_.bind(this.showTwit, this), this.service.config.timeout);
    },
    onShow: function(req, res) {
        res.send(this.shown);
    }
});

module.exports = function (options) {
    var self = this,
        name = options.service + "/" + options.name,
        router = express.Router(),
        lists = {
            newList:        NewList.open({name: name + "/newList", list: lists}),
            shownList:      ShownList.open({name: name + "/shownList", lists: lists}),
            pendingList:    PendingList.open({name: name + "/pendingList", lists: lists})
        };

    router.param("interface", function (req, res, next, id) {
        var list = self.get(id);
        if (!list) {
          return next(new Error('failed to load list'));
        }
        req.list = list;
        next();
    });

    router.use("/:interface", function (req) {
        var list = req.list;
        if (list && list.router) {
            this.list.router.apply(this, arguments);
        } else {
            res.send(true);
        }
    });

    return {
        router: router,
        lists: lists,
        add: lists.newList.add.bind(newList)
    };
};
*/