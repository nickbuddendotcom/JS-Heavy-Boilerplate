'use strict';

var Backbone        = require('backbone');

// TODO: switch to Marionette Router
module.exports = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  index: function() {
    // render a layout
  }
});
