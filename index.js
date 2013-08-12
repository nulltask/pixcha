
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