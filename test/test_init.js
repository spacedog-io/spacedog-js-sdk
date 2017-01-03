var SpaceDog = require('../spacedog.min.js')
var assert = require('assert');
var expect = require('chai').expect;

describe('init # ', function() {
  

    it('should init with backendId', function() {

      SpaceDog.initialize("dummyBackendId")

      var b = SpaceDog.getBackendId()

      assert.equal(b, "dummyBackendId")
    });

    it('should throw error when backendId not provided', function() {
      expect(SpaceDog.initialize).to.throw("BackendId is required.")
    });

});


