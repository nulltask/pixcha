
/**
 * Module dependencies.
 */

var requireAll = require('require-all');

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
 * @return {String}
 */

function pixcha(url) {
  var service = pixcha.service(url);
  console.log(service);
  if (!service) return null;

  var replace = services[service].replace;

  if ('function' === typeof replace) {
    return replace.call(null, url);
  }

  return url.replace.apply(url, replace);
}

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
