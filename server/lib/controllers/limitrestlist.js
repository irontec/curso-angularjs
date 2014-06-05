'use strict';

var RestList    = require('./restlist');

module.exports = RestList.extend({
    add: function (obj) {
        this.constructor.__super__.add.apply(this, arguments);
        if (this.config.size >= this.itemsLimit) {
            this.remove(this.first());
        }
    }
});
