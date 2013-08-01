
module.exports = {
  pattern: /http:\/\/instagr.am\/\d+/g,
  replace: function(url) {
    return url + '/media/?size=t';
  }
};