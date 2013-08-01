
module.exports = {
  pattern: /http:\/\/tweetphoto.com\/\d+/g,
  replace: function(url) {
    return 'http://api.plixi.com/api/TPAPI.svc/imagefromurl?size=small&url=' + url;
  }
};