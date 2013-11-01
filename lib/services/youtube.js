
module.exports = {
  pattern: /http:\/\/youtu\.be\/[\w\-]{11}/g,
  thumbnail: function(url) {
    return url.replace('youtu.be', 'img.youtube.com/vi') + '/0.jpg';
  }
};