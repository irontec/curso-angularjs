'use strict';

var basicAuth       = require('basic-auth-connect'),
    config          = require('../config');

module.exports = basicAuth(config.user, config.pass);
