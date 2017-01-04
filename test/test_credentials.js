var SpaceDog = require('../spacedog.min.js')
var assert = require('assert');
var expect = require('chai').expect;
var xhrMock = require('xhr-mock');
var localStorageMock = require('./util-mockLocalStorage.js')

const dummyLoginBody = JSON.stringify({
            accessToken:"dummyAccessToken",
            credentials:{
                id: "AVhny22SYj3HFanr3NH3", 
                backendId: "dummyBackendId", 
                username: "dummyUsername"
            },
            expiresIn:1126968,
            status:200,
            success:true
        })

describe('credentials # ', function() {
  
    beforeEach(function(){
      SpaceDog.initialize("dummyBackendId")

      localStorageMock.reset()
      localStorage = localStorageMock
    })

    before(function(){
      xhrMock.setup();
    })

    after(function(){
      xhrMock.teardown();
    })

    it('should login, config default header, remember, and say yes on canTryLogin', function(done) {

      xhrMock.get('https://dummyBackendId.spacedog.io/1/login', function(req, res) {

        expect(req.url()).to.equal('https://dummyBackendId.spacedog.io/1/login')
        expect(req.method()).to.equal('GET')
        expect(req.headers()['authorization']).to.equal("Basic " + new Buffer("dummyUsername:dummyPassword").toString('base64'))

        return res.status(200).header('Content-Type', 'application/json').body(dummyLoginBody);

      });

      SpaceDog.Credentials.login({
        "username":"dummyUsername",
        "password":"dummyPassword",
        "rememberMe":true
      }, function(err, res){

        expect(res).to.have.property("accessToken")
        expect(err).to.be.null;
        expect(res).to.be.instanceOf(Object)

        expect(SpaceDog.Credentials.canTryLogin()).to.be.true

        expect(SpaceDog._Config.default_authorization_header).to.equal("Bearer "+res.accessToken)

        done()
      })


    });


    it('should login, config default header, not remember, and say no on canTryLogin', function(done) {

      xhrMock.get('https://dummyBackendId.spacedog.io/1/login', function(req, res) {

        expect(req.url()).to.equal('https://dummyBackendId.spacedog.io/1/login')
        expect(req.method()).to.equal('GET')
        expect(req.headers()['authorization']).to.equal("Basic " + new Buffer("dummyUsername:dummyPassword").toString('base64'))

        return res.status(200).header('Content-Type', 'application/json').body(dummyLoginBody);

      });

      SpaceDog.Credentials.login({
        "username":"dummyUsername",
        "password":"dummyPassword",
        "rememberMe":false
      }, function(err, res){

        expect(res).to.have.property("accessToken")
        expect(err).to.be.null;
        expect(res).to.be.instanceOf(Object)

        expect(SpaceDog.Credentials.canTryLogin()).to.be.false

        expect(SpaceDog._Config.default_authorization_header).to.equal("Bearer "+res.accessToken)

        done()
      })


    });


    it('should say false by default on canTryLogin', function() {

        var canTryLogin = SpaceDog.Credentials.canTryLogin()

        expect(canTryLogin).to.be.false

    });


});

