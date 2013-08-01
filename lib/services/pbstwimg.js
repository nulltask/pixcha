
module.exports = {
  pattern: /https?\:\/\/pbs\.twimg\.com\//,
  replace: function(url) {
    return url;
  }
};