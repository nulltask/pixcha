
module.exports =  {
  pattern: /http:\/\/twitter\.yfrog\.com\/\w+/g,
  thumbnail: function(url) {
    return url + ':iphone';
  }
};