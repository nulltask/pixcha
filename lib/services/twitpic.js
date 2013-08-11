
module.exports = {
  pattern: /http:\/\/twitpic\.com\/\w{6}/g,
  thumbnail: ['twitpic.com', 'twitpic.com/show/thumb'],
  larger: function(url) {
    var parsed = url.match(/http:\/\/twitpic\.com\/(\w{6})/);
    var id = parseInt(parsed[1], 36);
    return 'http://d3j5vwomefv46c.cloudfront.net/photos/large/' + id + '.jpg'
  }
};