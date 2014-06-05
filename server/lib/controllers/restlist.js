'use strict';

var _       = require('lodash'),
    express = require('express'),

    io      = require('../io'),
    server  = require('../server'),

    yamlfs  = require('../utils/yamlfs'),
    utils   = require('../utils');


var REST = {
    index:   { verb: "get",    url: "/"         },
    create:  { verb: "post",   url: "/"         },
    show:    { verb: "get",    url: "/:id"      },
    update:  { verb: "put",    url: "/:id"      },
    remove:  { verb: "delete", url: "/:id"      }
};


var RESTlist = function (config, load) {
    this.data = {};
    this.config = {
        count: 0,
        size: 0
    };

    _.extend(this, config);

    this.RESTrouter();

    if (this.initialize && !load) this.initialize(config);

    if (!this.path) {
        console.log("warning, automatic path");
        this.path = _.uniqueId("RESTlist");
    }
};

RESTlist.prototype = {
    add: function (obj) {
        if (!obj) return;
        // Get the id
        var cid;
        if (obj._id) {
            if (_.isFinite(obj._id) && obj._id >= this.config.count)
                this.config.count = (+obj._id) + 1;

            cid = obj.cid = obj._id;
        } else {
            cid = obj.cid = this.config.count++;
        }

        obj = this.instatiate(obj);

        // Ensure the cid is not lost during the instantiation
        obj.cid = cid;

        // Insert the data
        this.data[obj.cid] = obj;
        this.config.size++;

        // notify
        this.triggerMethod("add", obj);
        this.emit("add", obj);

        return obj;
    },

    push: function () {
        return this.add.apply(this, arguments);
    },

    remove: function (index) {
        if (index === undefined || index === null) return;

        // index === req
        if (index.item) {
            index = index.item.cid;
        }
        
        // index === obj
        if (index.hasOwnProperty("cid")) {
            index = index.cid;
        }
        
        if (this.data.hasOwnProperty(index)) {
            var obj = this.data[index];
            if (!obj) return;

            this.config.size--;
            delete this.data[index];

            this.triggerMethod("remove", obj);
            this.emit("remove", {cid: obj.cid});
            return obj;
        }
    },

    clear: function () {
        _.forEach(this.data, function (value, key) {
            delete this.data[key];
        }, this);
        this.constructor();
        this.triggerMethod("clear");
        return true;
    },

    first: function () {
        return _.find(this.data, function (value, key) {
            return true;
        }, this);
    },

    get: function (id) {
        if (_.isObject(id)) {
            return _.where(this.data, id)[0];
        }
        return this.data[id];
    },

    list: function () {
        return this.data;
    },

    update: function (obj, data) {
        if (!_.isObject(obj)) return;
        if (obj.update) {
            obj.update(data);
        } else {
            _.extend(obj, _.omit(data, "cid"));
        }
        this.emit("update", obj);
    },


    /*
     * Open/Save functions
     */

    storedData: function (obj) {
        return obj && {
            data: obj.data,
            config: obj.config
        };
    },

    instatiate: function (obj) {
        if (!this.model || obj instanceof this.model) 
            return obj;

        if (this.model.open)
            return this.model.open(obj);
        
        return new (this.model)(obj);
    },

    save: function () {
        var store = this.storedData(this);
        if (this.model && this.model.prototype.save) {
            store = _.reduce(this.data, function (store, value, key, collection) {
                store.data[key] = value.save();
                return store;
            }, store, this);
        }

        yamlfs.save(this.path, store);
    },


    /*
     * Rest interface
     */

    RESTcreate: function (req, res) {
        var item = this.add(req.body);
        res.send(item);
        return item;
    },

    RESTindex: function (req, res) {
        var items = _.toArray(this.list());
        res.send(items);
        return items;
    },

    RESTshow: function(req, res) {
        res.send(req.item);
        return req.item;
    },

    RESTupdate: function (req, res) {
        this.update(req.item, req.body);
        res.send(req.item);
        return req.item;
    },

    RESTremove: function(req, res) {
        if (req.params.id !== "all") {
            res.send(!!this.remove(req));
            return req.item;
        } else {
            res.send(!!this.clear());
        }
    },

    RESTsocket: function (req, res) {
        res.send(this.path);
    },

    RESTrouter: function (params) {
        var self = this;

        this.router = express.Router();

        // Load element
        this.router.param("id", function (req, res, next, id) {
            if (id === 'all') {
                return next();
            }

            var item = self.get(id);
            if (!item) {
                console.log(self.path, id);
                return next(new Error('failed to load item'));
            }

            req.item = item;
            
            next();
        });

        // Use element's router if found
        this.router.use("/:id/", function (req, res, next) {
            if (req.item.router) {
                return req.item.router.apply(this, arguments);
            } else {
                return next();
            }
        });

        // Add REST verbs to the router
        return _.reduce(params || this.RESTexposed || _.keys(REST), function(router, op, key) {
            
            if (!REST[op]) return router;

            var verb = REST[op].verb, url  = REST[op].url;

            // Load middleware for each REST verb if defined
            if (this["REST" + op + "middleware"]) {
                router[verb](url, this["REST" + op + "middleware"]);
            }

            router[verb](url, function (req) {
                var ret = self["REST"+op].apply(self, arguments);
                self.triggerMethod("rest:" + op, ret);
            });

            return router;
        }, this.router, this);
    },

    /*
     * Socket
     */

    emit: function (op, obj) {
        server.io.sockets./*in(this.path).*/emit(this.path, {
            op: op,
            data: obj.toJSON ? obj.toJSON() : obj
        });
    },

    /*
     * Utils
     */

    triggerMethod: utils.triggerMethod,
};

RESTlist.extend = utils.extend;

RESTlist.open = function (config) {
    // Get model and the path from the config or the prototype info
    var model = config && config.model || this.prototype.model;
    var path = config && config.path || this.prototype.path;

    // Read the storable data from the yaml file
    var load =  _.extend(this.prototype.storedData(yamlfs.load(path)) || {}, config);

    // Instantiate the RESTlist
    var restlist = new this(load, true);

    // If the collection has a model associated, instantiate each object
    if (model) {
        _.forOwn(restlist.data, function (value, key, collection) {
            collection[key] = this.instatiate(value);
        }, restlist);
    }

    // Call the initialize method
    if (restlist.initialize) {
        restlist.initialize(config);
    }

    return restlist;
};

module.exports = RESTlist;
