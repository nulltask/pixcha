
module.exports =  {
  pattern: /http:\/\/twitter\.yfrog\.com\/\w+/g,
  replace: function(url) {
    return url + ':iphone';
  }
};