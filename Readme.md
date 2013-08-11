
# pixcha

Image URL extractor.

## Usage

Install via npm.

    $ npm install pixcha

## Example

```javascript
var pixcha = require('pixcha');

pixcha('http://twitpic.com/d5vkh9');  // => 'http://twitpic.com/show/thumb/d5vkh9'
pixcha.service('http://twitpic.com/d5vkh9');  // => 'twitpic
```

## License 

MIT

Copyright (c) 2013 Uniba Inc.  &lt;info@uniba.jp&gt;
