'use strict';

var _           = require('lodash'),
    events      = require('events'),

    path        = require('path'),
    fs          = require('fs'),
    mkdirp      = require('mkdirp'),
    yaml        = require('js-yaml'),

    env_all     = require('./env/all.js'),
    env_mode    = require('./env/' + env_all.env + '.js');

var emitter = new events.EventEmitter();

function Config (config) {
    _(this)
        .extend(env_all)
        .extend(env_mode);

    this.yamlconfig =  path.join(this.yamlPath, 'config.yaml');

    try {
        _.extend(this, yaml.safeLoad(fs.readFileSync(this.yamlconfig, 'utf8')));
    } catch (e) {
        if (e.code !== 'ENOENT' && e.errno !== 34) {
            console.warn("Failed to load tenant config file", e);
        }
    }
}

Config.prototype = {
    // Helper functions
    list: function () {
        return _(this).pick(["templates"]).value();
    },
    on: function () {
        emitter.on.apply(emitter, arguments);
    },
    update: function () {
        emitter.emit("update");
    },
    save: function () {
        mkdirp.sync(this.yamlPath);
        fs.writeFileSync(this.yamlconfig, yaml.safeDump(this.list()));
    },
};

module.exports = new Config();

process.on('exit', function () {
    module.exports.save();
});
