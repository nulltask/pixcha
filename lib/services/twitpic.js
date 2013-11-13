
/**
 * Module dependencies.
 */

var jsonp = require('jsonp')
var request = require('superagent');
var browser = require('is-browser');

var jsonUrl = 'http://api.twitpic.com/2/media/show.json';
var jsonpUrl = jsonUrl + 'p';
var baseUrl = 'http://d3j5vwomefv46c.cloudfront.net/photos/large/';

module.exports = {
  pattern: /http:\/\/twitpic\.com\/\w{6}/g,
  thumbnail: ['twitpic.com', 'twitpic.com/show/thumb'],
  larger: function(url, callback) {
    if (arguments.length < 2) {
      throw new TypeError('callback required,');
    }
    var parsed = url.match(/http:\/\/twitpic\.com\/(\w{6})/);
    var id = parseInt(parsed[1], 36);
    var params = { id: id };

    if (browser) {
      jsonp(jsonpUrl + '?id=' + parsed[1], function(err, data) {
        if (err) return callback(err);
        var ext = data.type;
        callback(null, baseUrl + id + '.' + ext);
      });
    } else {
      request(jsonUrl)
      .query(param)
      .end(function(res) {
        if (!res.ok) return callback(res);
        var ext = res.body.type;
        callback(null, baseUrl + id + '.' + ext);
      });
    }
  }
};

