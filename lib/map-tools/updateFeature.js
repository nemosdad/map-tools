/*jslint node: true */
"use strict"

var utils = require('map-tools/utils');


module.exports = function(global, that) {

  function updateStyle (f, style) {
	  if (typeof style === 'function') {
		  var styleOptions = style.call(f)
		  return that.instance.data.overrideStyle(f, styleOptions);
	  }
    that.instance.data.overrideStyle(f, style);
  }

  function update(args, options){
    var type = Object.prototype.toString.call(args);

    if (type === '[object Array]') {
      var feature, x;
      for (x in args) {
        feature = args[x];
        findAndUpdate(feature, options);
      }
    }

    if (type === '[object Object]') {
      findAndUpdate(args, options);
    }
  };

  function findAndUpdate(args, options) {

    if (args.data && args.data.uid) {
      return updateFeature(args, options);
    }

    if (args.uid && global.GMP.maps[that.id].json && global.GMP.maps[that.id].json.all[args.uid]) {
      return updateFeature(global.GMP.maps[that.id].json.all[args.uid], options);
    }
  }


  function updateFeature(feature, options) {
    if( options.style ) {
      updateStyle(feature, options.style);
    }
  }



  return update;
};