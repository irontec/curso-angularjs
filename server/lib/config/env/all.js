'use strict';

var _           = require('lodash'),
    path        = require('path');

var rootPath = path.normalize(__dirname + '/../../..')

module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 9000,
    
    // Paths
    rootPath: rootPath,
    appPath: path.join(rootPath, 'public'),
    viewsPath: path.join(rootPath, 'views'),
    uploadPath: path.join(rootPath, 'tmpUpload'),
    yamlPath: path.join(rootPath, 'yaml'),
};
