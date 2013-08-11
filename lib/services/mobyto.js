
module.exports = {
  pattern: /http:\/\/moby\.to\/\d+/g,
  thumbnail: function(url) {
    return url + ':square';
  }
};