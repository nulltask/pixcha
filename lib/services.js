
/**
 * Expose built-in services.
 */

var services = [
  'imgly',
  'instagram',
  'lockerz',
  'mobyto',
  'pbstwimg',
  'plixi',
  'tweetphoto',
  'twimg',
  'twipple',
  'twitpic',
  'twitteryfrog',
  'yfrog',
  'youtube'
];

services.forEach(function(service) {
  exports[service] = require('./services/' + service);
});
