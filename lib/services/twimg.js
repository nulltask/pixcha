
module.exports = {
  pattern: /http\:\/\/p\.twimg\.com\/[a-zA-Z0-9]+/,
  replace: function(url) {
    return url;
  }
};