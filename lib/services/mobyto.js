
module.exports = {
  pattern: /http:\/\/moby\.to\/\d+/g,
  replace: function(url) {
    return url + ':square';
  }
};