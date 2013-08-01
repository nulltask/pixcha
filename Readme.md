
# vkko

Image URL extractor.

## Usage

Install via npm.

    $ npm install vkko

## Example

```javascript
var vkko = require('vkko');

vkko('http://twitpic.com/d5vkh9');  // => 'http://twitpic.com/show/thumb/d5vkh9'
vkko.service('http://twitpic.com/d5vkh9');  // => 'twitpic
```

## License 

MIT

Copyright (c) 2013 Uniba Inc.  &lt;info@uniba.jp&gt;
