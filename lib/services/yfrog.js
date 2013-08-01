
module.exports =  {
  pattern: /http:\/\/yfrog.com\/\w+/g,
  replace: function(url) {
    return url + ':iphone';
  }
};