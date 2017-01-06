var SpaceDog = require('../spacedog.min.js')
var assert = require('assert');
var expect = require('chai').expect;
var xhrMock = require('xhr-mock');
var _ = require('lodash');

describe('data # ', function() {
  

    beforeEach(function(){
      SpaceDog.initialize("dummyBackendId")

      xhrMock.setup();

      xhrMock.post('https://dummyBackendId.spacedog.io/1/search/dummyType', function(req, res) {

        var length = 10
        var body = JSON.parse(req.body())
        if (body.size) {
            length = body.size
        } 

        expect(req.url()).to.equal('https://dummyBackendId.spacedog.io/1/search/dummyType')
        expect(req.method()).to.equal('POST')
        expect(req.headers()['content-type']).to.equal('application/json')

        //return null;              //simulate an error
        // return res.timeout(true); //simulate a timeout

        return res
          .status(201)
          .header('Content-Type', 'application/json')
          .body(JSON.stringify({
                                  "took": 1,
                                  "total": 10,
                                  "results": Array.from(Array(length).keys()).map(function(a,o){ return {
                                        ["foo"+a]:"bar"+a
                                    }})
                                  
                              }))

      });
    })

    afterEach(function(){
      xhrMock.teardown();
    })



    it('should search on one type, http post', function(done) {

      SpaceDog.Data.search({
        "type":"dummyType", 
        "payload":{
          "query":{
              "match_all":{ }
          },
          "from":0,
          "size":10
          //"sort":
        }
      }, function(err, res){

        expect(err).to.be.null

        expect(res).to.not.be.null
        expect(res).to.have.property("total")
        expect(res).to.have.property("results")
        expect(res).to.be.instanceOf(Object)

        done()
      })
    })




    it('should paginate', function(done) {

        var session = new SpaceDog.Data.PaginationSession(0, 7)

        SpaceDog.Data.search( {
            "type":"dummyType"
        }, function (err, res){

            expect(session.isNextPageAvailable()).to.be.true
            expect(res.results.length).to.equal(7)

            session.pointNextPage()

            SpaceDog.Data.search( {
                "type":"dummyType"
            }, function (err, res){

                expect(session.isNextPageAvailable()).to.be.false

                done()
            }, session)

        }, session)
    })

    // Les 2 suivants sont moins prioritaires 
    //
    // it('should search on one type, http get', function() {
    //   SpaceDog.initialize("dummyBackendId")

    //   SpaceDog.Data.Search("course", "david attias")

    //   // mock
    //   // HTTP GET /{backendId}.spacedog.io/1/search/course avec q= et from et size ...

    // });

    // it('should search on all types, http post', function() {
    //   SpaceDog.initialize("dummyBackendId")

    //   SpaceDog.Data.Search({
    //     "query":{
    //         "match_all":{ }
    //     },
    //     "from":0,
    //     "size":10
    //     //"sort":
    //   })

    //   // mock
    //   // HTTP POST /{backendId}.spacedog.io/1/search avec le payload

    // });



    // it('should findOne', function() {
    //   SpaceDog.initialize("dummyBackendId")

    //   SpaceDog.Data.findOne("dummyType", "dummyId").then(function(res){
    //     // assert res == ...      
    //   })

    //   // mock
    //   // HTTP GET /{backendId}.spacedog.io/1/data/dummyType/dummyId et retourne
    //   // {
    //   //  ...,
    //   //  meta: { ... }
    //   // }

    // });


    // it('should find', function() {
    //   SpaceDog.initialize("dummyBackendId")

    //   SpaceDog.Data.find("dummyType", 0, 10).then(function(res){
    //     // assert res == ...      
    //   })

    //   // mock
    //   // HTTP GET /{backendId}.spacedog.io/1/data/dummyType?from=0&size=10 et retourne
    //   // {
    //   //  ...,
    //   //  total: 20,
    //   //  results : [ {...}, ... ]
    //   // }

    // });


    // it('should update', function() {
    //   SpaceDog.initialize("dummyBackendId")

    //   SpaceDog.Data.update("dummyType", "dummyId", { "foo":"bar" })

    //   // mock
    //   // HTTP PUT /{backendId}.spacedog.io/1/data/dummyType/dummyId?stric=true avec payload foo:bar

    // });

    // it('should patch', function() {
    //   SpaceDog.initialize("dummyBackendId")

    //   SpaceDog.Data.patch("dummyType", "dummyId", { "foo":"bar" })

    //   // mock
    //   // HTTP PUT /{backendId}.spacedog.io/1/data/dummyType/dummyId avec payload foo:bar

    // });

    // it('should delete', function() {
    //   SpaceDog.initialize("dummyBackendId")

    //   SpaceDog.Data.patch("dummyType", "dummyId")

    //   // mock
    //   // HTTP DELETE /{backendId}.spacedog.io/1/data/dummyType/dummyId

    // });
});

