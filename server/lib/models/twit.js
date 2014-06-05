'use strict';

var _ = require('lodash');

var Twit = function Twit (data) {
    _.extend(this, data);
};

Twit.prototype = {
    toJSON: function () {
        var avatar = this.user.profile_image_url;
        var big_av = avatar.match(/^(.*profile_images.*)_normal(\..*)$/);

        return {
            id: this.id,
            cid: this.cid,
            text: this.text,
            name: this.user.name,
            screen_name: this.user.screen_name,
            images: this.entities ? 
                _(this.entities.media).map(function (item) {
                    return {image: item.media_url};
                }).value() : [],
            image: avatar,
            big_image: big_av? big_av[1] + big_av[2] : null
        };
    }
};

module.exports = Twit;
