var SpaceDog = require('../spacedog.min.js')
var assert = require('assert');
var expect = require('chai').expect;

describe('init # ', function() {
  

    it('should init with backendId', function() {

      SpaceDog.initialize("dummyBackendId")

      assert.equal(SpaceDog.getBackendId(), "dummyBackendId")
      assert.equal(SpaceDog.getBaseUrl(), "https://dummyBackendId.spacedog.io")
    });

    it('should init with base url', function() {

      SpaceDog.initializeWithBaseUrl("https://myPersonnal.dummyBaseUrl.com")

      assert.equal(SpaceDog.getBaseUrl(), "https://myPersonnal.dummyBaseUrl.com")
      assert.equal(SpaceDog.getBackendId(), null)
    });

    it('should throw error when backendId not provided', function() {
      expect(SpaceDog.initialize).to.throw("BackendId is required.")
    });

    it('should throw error when baseUrl not provided', function() {
      expect(SpaceDog.initializeWithBaseUrl).to.throw("BaseUrl is required.")
    });

});


