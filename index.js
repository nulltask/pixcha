
/**
 * Module dependencies.
 */

var requireAll = require('require-all');

/**
 * Expose `vkko`.
 */

module.exports = vkko;

/**
 * Services.
 */

var services = requireAll({ dirname: __dirname + '/lib/services', filter: /(.*)\.js$/ });

/**
 * @@param {String} url
 */

function vkko(url) {
  var service = vkko.service(url);
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

vkko.service = function(url) {
  for (var service in services) {
    var match = url.match(services[service].pattern);
    if (match) return service;
  }
  return null;
};