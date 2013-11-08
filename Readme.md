
# pixcha

Image URL extractor.

## Usage

Install via npm.

    $ npm install pixcha

via [component](http://component.io)

    $ component install nulltask/pixcha

via [bower](http://bower.io)

    $ bower install pixcha

## Example

```javascript
var pixcha = require('pixcha');

pixcha('http://twitpic.com/d5vkh9', function(err, url) {
  // url => 'http://d3j5vwomefv46c.cloudfront.net/photos/large/795931245.jpg'
});

pixcha.thumbnail('http://twitpic.com/d5vkh9', function(err, url) {
  // url => 'http://twitpic.com/show/thumb/d5vkh9'
});

pixcha.service('http://twitpic.com/d5vkh9');  // => 'twitpic
```

## License 

MIT

Copyright (c) 2013 Uniba Inc.  &lt;info@uniba.jp&gt;
