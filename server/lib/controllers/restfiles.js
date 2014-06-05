'use strict';

var _           = require('lodash'),
    fs          = require('fs'),
    path        = require('path'),
    chokidar    = require('chokidar'),
    readdir     = require('recursive-readdir'),
    multiparty  = require('connect-multiparty'),
    config      = require('../config'),
    RESTlist    = require('./restlist');

var FileModel = function (options) {
    _.extend(this, options);
};

FileModel.prototype.toJSON = function () {
    return {
        cid: this.cid,
        name: this.name
    };
};

module.exports = RESTlist.extend({
    
    model: FileModel,

    initialize: function () {
        var self = this;

        if (!this.dirname) {
            console.log("restfiles, invalid dirname", this.dirname);
        }

        this.filenames = {};
        this.fulldirname = this.dirname;

        if (!fs.existsSync(this.fulldirname)) {
            console.log("restfiles, non existent dirname", this.fulldirname);
        }

        var watch = chokidar.watch(this.fulldirname, {
            ignored: /[\/\\]\./, 
            persistent: true
        });

        watch
            .on('add', function(filepath) {
                self.add({filename: filepath});
            })
            .on('change', function(filepath) {
                self.update([filepath]);
            })
            .on('unlink', function(filepath) {
                self.remove(self.filenames[filepath]);
            });

        readdir(this.fulldirname, function (err, files) {
            if (err) return;

            files.forEach(function (filepath) {
                self.add({filename: filepath});
            });
        });

        this.tmpfulldirname = this.tmpfulldirname || this.fulldirname;

        // Ensure dir exist
        fs.mkdir(this.fulldirname, function () {});
        fs.mkdir(this.tmpfulldirname, function () {});

        // Initializate multipart middleware
        //this.RESTcreatemiddleware = multiparty({uploadDir:this.tmpfulldirname});
    },

    add: function (file) {
        file.name = path.relative(this.fulldirname,file.filename);
        if (this.filenames[file.filename]) return;
        var ret = RESTlist.prototype.add.call(this, file);
        this.filenames[file.filename] = file;
        return ret;
    },

    remove: function (file) {
        var ret = RESTlist.prototype.remove.call(this, file);
        if (ret)
            delete this.filenames[ret.filename];
        return ret;
    },

    update: function () {},

    storedData: function (obj) {
        return obj && {
            config: _.omit(obj.config, ['count', 'size'])
        };
    },

    RESTcreate: function (req, res) {
        if (!req.files) {
            res.send(false);
            return;
        }
        var tmpPath     = req.files.file.path,
            filename    = path.basename(tmpPath),
            targetPath  = path.join(this.fulldirname, filename),
            extension   = path.extname(req.files.file.name).toLowerCase();

        if (extension === '.png' || extension === '.jpg') {
            var self = this;
            fs.rename(tmpPath, targetPath, function (err) {
                if (err) {
                    console.log("tried to rename", tmpPath, "to", targetPath);
                    console.log(err);
                    res.send({error: err});
                } else {
                    var file = self.add({filename: targetPath});
                    res.send(file);
                    return file;
                }
            });
        } else {
            fs.unlink(tmpPath, function (err) {
                res.send({error: "Only .png or .jpg files are allowed!"});
            });
        }
    },

    RESTshow: function (req, res) {
        if (req.item)
            res.sendfile(req.item.filename);
        else
            res.send(false);
    },
});
