
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

function pixcha(url, options, callback) {
  if ('function' === typeof options) {
    callback = options;
    options = {};
  }
  if (!callback) {
    callback = function() {};
  }
  options = options || {};

  var service = pixcha.service(url);

  if (!service) {
    callback(new Error('service not found.'));
    return null;
  }

  var replace = options.thumbnail
    ? services[service].thumbnail
    : (services[service].larger || services[service].thumbnail);

  if ('function' === typeof replace) {
    try {
      var ret = replace.call(null, url, callback);
      if (replace.length < 2) {
        callback(null, ret);
      }
      return ret;
    } catch (e) {
      callback(e);
      return e;
    }
  }

  var ret = url.replace.apply(url, replace);
  callback(null, ret);
  return ret;
}

/**
 * @param {String} url
 * @return {String}
 */

pixcha.thumbnail = function(url, callback) {
  return pixcha(url, { thumbnail: true }, callback);
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