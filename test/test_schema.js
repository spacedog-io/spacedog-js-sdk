var SpaceDog = require('../spacedog.min.js')
var assert = require('assert');
var expect = require('chai').expect;
var xhrMock = require('xhr-mock');

describe('schema # ', function() {
  
    beforeEach(function(){
      SpaceDog.initialize("dummyBackendId")
      xhrMock.setup();
    })

    afterEach(function(){
      xhrMock.teardown();
    })

    it('should search on one type, http get', function(done) {

      xhrMock.get('https://dummyBackendId.spacedog.io/1/schema', function(req, res) {

        expect(req.url()).to.equal('https://dummyBackendId.spacedog.io/1/schema')
        expect(req.method()).to.equal('GET')

        //return null;              //simulate an error
        //return res.timeout(true); //simulate a timeout

        return res
          .status(200)
          .header('Content-Type', 'application/json')
          .body(JSON.stringify({"dummySchema1":{"foo":"bar"}, "dummySchema2":{"foo2":"bar2"}}))
        ;

      });

      SpaceDog.Schema.list(function(err, res){

        expect(err).to.be.null;

        expect(res).to.deep.equal({"dummySchema1":{"foo":"bar"}, "dummySchema2":{"foo2":"bar2"}})
        expect(res).to.be.instanceOf(Object)

        done()
      })
    });

});

