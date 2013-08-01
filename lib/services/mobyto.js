
module.exports = {
  pattern: /http:\/\/mobyto\/\d+/g,
  replace: function(url) {
    return url + ':square';
  }
}