
/**
 * Module dependencies.
 */

var request = require('superagent');

module.exports = {
  pattern: /http:\/\/twitpic\.com\/\w{6}/g,
  thumbnail: ['twitpic.com', 'twitpic.com/show/thumb'],
  larger: function(url, callback) {
    if (arguments.length < 2) {
      throw new TypeError('callback required,');
    }
    var parsed = url.match(/http:\/\/twitpic\.com\/(\w{6})/);
    var id = parseInt(parsed[1], 36);

    request('http://api.twitpic.com/2/media/show.json')
    .query({ id: parsed[1] })
    .end(function(res) {
      if (!res.ok) {
        return callback(res);
      }
      var ext = res.body.type;
      return callback(null,
        'http://d3j5vwomefv46c.cloudfront.net/photos/large/' + id + '.' + ext);
    });
  }
};