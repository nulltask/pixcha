
module.exports = {
  pattern: /http\:\/\/p\.twimg\.com\/[a-zA-Z0-9]+/,
  thumbnail: function(url) {
    return url;
  }
};