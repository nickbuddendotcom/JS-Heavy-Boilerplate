'use strict';

var _             = require('lodash'),
    Backbone      = require('backbone'),
    $             = require('jquery'),
    Wreqr         = require('backbone.wreqr'),
    Babysitter    = require('backbone.babysitter'),
    Marionette    = require('backbone.marionette'),
    app;

// Tell Backbone & Marionette where jQuery lives
Marionette.$ = Backbone.$ = $;
Backbone.Wreqr        = Wreqr;
Backbone.Babysitter   = Babysitter;

app = new Marionette.Application();

app.addInitializer(function(){
  Backbone.history.start({ pushState: true, root: '/' });
});

module.exports = app;
