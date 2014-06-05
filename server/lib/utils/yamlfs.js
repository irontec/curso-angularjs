'use strict';

var _           = require('lodash'),
    path        = require('path'),
    fs          = require('fs'),
    yaml        = require('js-yaml'),
    mkdirp      = require('mkdirp'),

    config      = require('../config');

function dumpException(obj, path) {
    _.forOwn(obj, function (value, key) {
        if (_.isFunction(value) || _.isUndefined(value))
            console.log(path + key, value);
        else
            dumpException(value, path + key + ".");
    });
}

module.exports = {
    load: function (filename) {
        var file = path.join(config.yamlPath, filename + '.yaml');
        try {
            return yaml.safeLoad(fs.readFileSync(file, 'utf8'));
        } catch (e) {
            if (e.code !== 'ENOENT' && e.errno !== 34) {
                console.log("error", e.message, "line", e.mark.line);
            }
        }
    },

    save: function (filename, obj) {
        var file = path.join(config.yamlPath, filename + '.yaml');
        var dirname = path.dirname(file);

        // Ensure the dir exists
        mkdirp.sync(dirname);

        try {
            fs.writeFileSync(file, yaml.safeDump(obj));
        } catch (e) {
            console.trace();
            console.log(e);
            dumpException(obj, "");
        }
    }
};
