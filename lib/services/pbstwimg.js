
module.exports = {
  pattern: /https?\:\/\/pbs\.twimg\.com\//,
  thumbnail: function(url) {
    return url;
  }
};