
module.exports =  {
  pattern: /http:\/\/yfrog\.com\/\w+/g,
  thumbnail: function(url) {
    return url + ':iphone';
  }
};