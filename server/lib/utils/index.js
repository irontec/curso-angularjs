'use strict';

// Backbone's extend method

var _ = require('lodash');

module.exports.extend = function (protoProps, staticProps) {
  var parent = this;
  var child;

  // The constructor function for the new subclass is either defined by you
  // (the "constructor" property in your `extend` definition), or defaulted
  // by us to simply call the parent's constructor.
  if (protoProps && _.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function(){ return parent.apply(this, arguments); };
  }

  // Add static properties to the constructor function, if supplied.
  _.extend(child, parent, staticProps);

  // Set the prototype chain to inherit from `parent`, without calling
  // `parent`'s constructor function.
  var Surrogate = function(){ this.constructor = child; };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate();

  // Add prototype properties (instance properties) to the subclass,
  // if supplied.
  if (protoProps) _.extend(child.prototype, protoProps);

  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.__super__ = parent.prototype;

  return child;
};


// http://marionettejs.com/docs/backbone.marionette.html
var splitter = /(^|:)(\w)/gi;

function getEventName(match, prefix, eventName) {
  return eventName.toUpperCase();
}

module.exports.triggerMethod = function triggerMethod(event) {
  var methodName = 'on' + event.replace(splitter, getEventName);
  var method = this[methodName];

  if(_.isFunction(this.trigger)) {
    this.trigger.apply(this, arguments);
  }

  if (_.isFunction(method)) {
    return method.apply(this, _.tail(arguments));
  }
};

module.exports.yamlfs = require('./yamlfs');
