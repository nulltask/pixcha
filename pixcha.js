;(function(){

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("pixcha/index.js", function(exports, require, module){

/**
 * Expose `pixcha`.
 */

module.exports = pixcha;

/**
 * Services.
 */

var services = require('./lib/services');

/**
 * @param {String} url
 * @param {Object} options
 * @return {String}
 */

function pixcha(url, options) {
  options = options || {};

  var service = pixcha.service(url);

  if (!service) return null;

  var replace = options.thumbnail
    ? services[service].thumbnail
    : (services[service].larger || services[service].thumbnail);

  if ('function' === typeof replace) {
    return replace.call(null, url);
  }

  return url.replace.apply(url, replace);
}

/**
 * @param {String} url
 * @return {String}
 */

pixcha.thumbnail = function(url) {
  return pixcha(url, { thumbnail: true });
};

/**
 * @param {String} url
 * @return {String}
 */

pixcha.service = function(url) {
  for (var service in services) {
    var match = url.match(services[service].pattern);
    if (match) return service;
  }
  return null;
};

/**
 * @param {String} name
 * @param {}
 */
});
require.register("pixcha/lib/services.js", function(exports, require, module){

/**
 * Expose built-in services.
 */

var services = [
  'imgly',
  'instagram',
  'lockerz',
  'mobyto',
  'pbstwimg',
  'plixi',
  'tweetphoto',
  'twimg',
  'twipple',
  'twitpic',
  'twitteryfrog',
  'yfrog',
  'youtube'
];

services.forEach(function(service) {
  exports[service] = require('./services/' + service);
});

});
require.register("pixcha/lib/services/imgly.js", function(exports, require, module){

module.exports = {
  pattern: /http:\/\/img\.ly\/\w{4}/g,
  thumbnail: ['img.ly', 'img.ly/show/mini']
};
});
require.register("pixcha/lib/services/instagram.js", function(exports, require, module){

module.exports = {
  pattern: /http:\/\/instagr\.am\/\d+/g,
  thumbnail: function(url) {
    return url + '/media/?size=t';
  },
  larger: function(url) {
    return url + '/media/?size=l';
  }
};
});
require.register("pixcha/lib/services/lockerz.js", function(exports, require, module){

module.exports = {
  pattern: /http:\/\/lockerz\.com\/s\/\d+/g,
  thumbnail: function(url) {
    return 'http://api.plixi.com/api/TPAPI.svc/imagefromurl?size=small&url=' + url;
  }
};
});
require.register("pixcha/lib/services/mobyto.js", function(exports, require, module){

module.exports = {
  pattern: /http:\/\/moby\.to\/\d+/g,
  thumbnail: function(url) {
    return url + ':square';
  }
};
});
require.register("pixcha/lib/services/pbstwimg.js", function(exports, require, module){

module.exports = {
  pattern: /https?\:\/\/pbs\.twimg\.com\//,
  thumbnail: function(url) {
    return url;
  }
};
});
require.register("pixcha/lib/services/plixi.js", function(exports, require, module){

module.exports = {
  pattern: /http:\/\/plixi\.com\/p\/\d+/g,
  thumbnail: function(url) {
    return 'http://api.plixi.com/api/TPAPI.svc/imagefromurl?size=small&url=' + url;
  }
};
});
require.register("pixcha/lib/services/tweetphoto.js", function(exports, require, module){

module.exports = {
  pattern: /http:\/\/tweetphoto\.com\/\d+/g,
  thumbnail: function(url) {
    return 'http://api.plixi.com/api/TPAPI.svc/imagefromurl?size=small&url=' + url;
  }
};
});
require.register("pixcha/lib/services/twimg.js", function(exports, require, module){

module.exports = {
  pattern: /http\:\/\/p\.twimg\.com\/[a-zA-Z0-9]+/,
  thumbnail: function(url) {
    return url;
  }
};
});
require.register("pixcha/lib/services/twipple.js", function(exports, require, module){

module.exports = {
  pattern: /http:\/\/p\.twipple\.jp\/\w+/g,
  thumbnail: ['p.twipple.jp', 'p.twipple.jp/show/thumb']
};
});
require.register("pixcha/lib/services/twitpic.js", function(exports, require, module){

module.exports = {
  pattern: /http:\/\/twitpic\.com\/\w{6}/g,
  thumbnail: ['twitpic.com', 'twitpic.com/show/thumb'],
  larger: function(url) {
    var parsed = url.match(/http:\/\/twitpic\.com\/(\w{6})/);
    var id = parseInt(parsed[1], 36);
    return 'http://d3j5vwomefv46c.cloudfront.net/photos/large/' + id + '.jpg'
  }
};
});
require.register("pixcha/lib/services/twitteryfrog.js", function(exports, require, module){

module.exports =  {
  pattern: /http:\/\/twitter\.yfrog\.com\/\w+/g,
  thumbnail: function(url) {
    return url + ':iphone';
  }
};
});
require.register("pixcha/lib/services/yfrog.js", function(exports, require, module){

module.exports =  {
  pattern: /http:\/\/yfrog\.com\/\w+/g,
  thumbnail: function(url) {
    return url + ':iphone';
  }
};
});
require.register("pixcha/lib/services/youtube.js", function(exports, require, module){

module.exports = {
  pattern: /http:\/\/youtu\.be\/[\w\-]{11}/g,
  thumbnail: function(url) {
    return url.replace('youtu.be', 'img.youtube.com/vi') + '/0.jpg';
  }
};
});if (typeof exports == "object") {
  module.exports = require("pixcha");
} else if (typeof define == "function" && define.amd) {
  define(function(){ return require("pixcha"); });
} else {
  this["pixcha"] = require("pixcha");
}})();