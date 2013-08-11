
module.exports = {
  pattern: /http:\/\/instagr\.am\/\d+/g,
  thumbnail: function(url) {
    return url + '/media/?size=t';
  },
  larger: function(url) {
    return url + '/media/?size=l';
  }
};