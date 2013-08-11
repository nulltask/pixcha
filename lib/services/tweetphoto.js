
module.exports = {
  pattern: /http:\/\/tweetphoto\.com\/\d+/g,
  thumbnail: function(url) {
    return 'http://api.plixi.com/api/TPAPI.svc/imagefromurl?size=small&url=' + url;
  }
};