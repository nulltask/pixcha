
var p = require('../');
var assert = require('better-assert');

describe('pixcha', function() {

  it('should be a function', function() {
    assert('function' === typeof p);
  });

  describe('.thumbnail', function() {
    it('should be a function', function() {
      assert('function' === typeof p.thumbnail);
    });
  });

  describe('.service', function() {
    it('should be a function', function() {
      assert('function' === typeof p.service);
    });
  });

  describe('.use', function() {
    it('should be a function', function() {
      assert('function' === typeof p.use);
    });
  });

  describe('services', function() {

    describe('imgly', function() {
      it('service');
      it('thumbnail');
      it('larger');
    });

    describe('instagram', function() {
      it('service');
      it('thumbnail');
      it('larger');
    });

    describe('lockerz', function() {
      it('service');
      it('thumbnail');
      it('larger');
    });

    describe('pbstwimg', function() {
      it('service');
      it('thumbnail');
      it('larger');
    });

    describe('plixi', function() {
      it('service');
      it('thumbnail');
      it('larger');
    });

    describe('tweetphoto', function() {
      it('service');
      it('thumbnail');
      it('larger');
    });

    describe('twimg', function() {
      it('service');
      it('thumbnail');
      it('larger');
    });

    describe('twipple', function() {
      it('service');
      it('thumbnail');
      it('larger');
    });

    describe('twitpic', function() {
      it('service');
      it('thumbnail');
      it('larger');
    });

    describe('twitteryfrog', function() {
      it('service');
      it('thumbnail');
      it('larger');
    });

    describe('yfrog', function() {
      it('service');
      it('thumbnail');
      it('larger');
    });

    describe('youtube', function() {
      it('service');
      it('thumbnail');
      it('larger');
    });
  });
});
