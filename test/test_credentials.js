var SpaceDog = require('../spacedog.min.js')
var assert = require('assert');
var expect = require('chai').expect;
var xhrMock = require('xhr-mock');
var localStorageMock = require('./util-mockLocalStorage.js')

global.btoa = function (str) {
  return new Buffer(str).toString('base64');
}

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
      SpaceDog.forgetAll()
      SpaceDog.initialize("dummyBackendId")

      localStorageMock.reset()
      localStorage = localStorageMock
      
      xhrMock.setup();
    })

    afterEach(function(){
      xhrMock.teardown();
    })

    it('should login, config default header, remember, and say yes on canTryLogin', function(done) {

      var called = false;

      xhrMock.get('https://dummyBackendId.spacedog.io/1/login', function(req, res) {

        expect(req.url()).to.equal('https://dummyBackendId.spacedog.io/1/login')
        expect(req.method()).to.equal('GET')
        expect(req.headers()['authorization']).to.contain("Basic ZH")
        called=true

        return res.status(200).header('Content-Type', 'application/json').body(dummyLoginBody);

      });

      SpaceDog.Credentials.login({
        "username":"dummyUsername",
        "password":"dummyPassword",
        "rememberMe":true
      }, function(err, res){

        expect(called).to.be.true

        expect(res).to.have.property("accessToken")
        expect(err).to.be.null;
        expect(res).to.be.instanceOf(Object)

        expect(SpaceDog.Credentials.canTryLogin()).to.be.true

        expect(SpaceDog._Config.default_authorization_header).to.equal("Bearer "+res.accessToken)

        expect(SpaceDog.Credentials.getRememberedState()).to.have.property("accessToken")
        expect(SpaceDog.Credentials.getRememberedState()).to.have.property("backendId")
        expect(SpaceDog.Credentials.getRememberedState()).to.have.property("baseUrl")

        done()
      })
    });

    it('should login, config default header, not remember, and say no on canTryLogin', function(done) {

      xhrMock.get('https://dummyBackendId.spacedog.io/1/login', function(req, res) {

        expect(req.url()).to.equal('https://dummyBackendId.spacedog.io/1/login')
        expect(req.method()).to.equal('GET')
        expect(req.headers()['authorization']).to.contain("Basic ZH")

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

    it('should fail login', function(done) {

      xhrMock.get('https://dummyBackendId.spacedog.io/1/login', function(req, res) {
        return res.status(401).header('Content-Type', 'application/json').body(JSON.stringify({
          error: {
            code:"invalid-credentials",
            message:"invalid username or password for backend [dummyBackendId]"
          },
          status:401,
          success:false
        }));
      });

      SpaceDog.Credentials.login({
        "username":"dummyWrongUsername",
        "password":"dummyWrongPassword",
        "rememberMe":false
      }, function(err, res){

        expect(err).to.not.be.null
        expect(err).to.have.property("error")
        expect(err).to.have.property("status")

        expect(res).to.be.null

        expect(SpaceDog.Credentials.canTryLogin()).to.be.false

        expect(SpaceDog._Config.default_authorization_header).to.be.null

        done()
      })
    });
 
    it('should login with saved credentials', function (done) {
      var called = false
      xhrMock.get('https://dummyBaseUrl.io/1/login', function(req, res) {
        expect(res.headers['authorization']).to.equal("Bearer dummySavedAccessToken")
        called = true
        return res.status(200).header('Content-Type', 'application/json').body(JSON.stringify({
          "accessToken": "dummyReturnedAccessToken"
        }));
      });

      localStorage.setItem('SPACEDOG_CREDENTIALS_TOKEN', JSON.stringify({
        backendId: null,
        baseUrl: 'https://dummyBaseUrl.io',
        accessToken: 'dummySavedAccessToken'
      }))

      SpaceDog.Credentials.loginWithSavedCredentials(function (err, res) {
        expect(called).to.be.true

        expect(res).to.have.property("accessToken")
        expect(err).to.be.null;
        
        expect(SpaceDog.Credentials.canTryLogin()).to.be.true
        expect(SpaceDog._Config.default_authorization_header).to.equal("Bearer dummyReturnedAccessToken")
      })

      done()
    })

    it('should say false by default on canTryLogin', function() {

        var canTryLogin = SpaceDog.Credentials.canTryLogin()

        expect(canTryLogin).to.be.false
    });

    it('should create a user', function(done) {

      xhrMock.post('https://dummyBackendId.spacedog.io/1/credentials', function(req, res) {
        return res.status(201).header('Content-Type', 'application/json').body(JSON.stringify({
          id:"dummyCredentialId",
          status:201,
          success:true
        }));
      });

      xhrMock.post('https://dummyBackendId.spacedog.io/1/data/MyUser', function(req, res) {
        return res.status(201).header('Content-Type', 'application/json').body(JSON.stringify({
          id:"dummyMyUserId",
          status:201,
          success:true
        }));
      });

      SpaceDog.Credentials.createUser({
        credentials: {
          "username":"dummyUsername",
          "password":"dummyPassword",
          "email":"dummyEmail",
          "level": "DUMMYLEVEL",
        },
        user: {
          "type":"MyUser",
          "credentialIdField":"dummy_credential_id",
          "payload": {
            "lastname": "dummyLastname",
            "firstname": "dummyFirstname",
            "mydummyfield": "dummyFieldValue",
          }
        }
      }, function(err, res){

        expect(err).to.be.null
        expect(res).to.not.be.null

        expect(res).to.have.property('firstname')        
        expect(res).to.have.property('lastname')        
        expect(res).to.have.property('email')  
        expect(res).to.not.have.property('password')  
        expect(res).to.have.property('mydummyfield')        
        expect(res).to.have.property('username')
        expect(res).to.have.property('dummy_credential_id')
        expect(res).to.have.property('meta')
        expect(res).to.not.have.property('password')

        expect(res.firstname).to.equal('dummyFirstname')
        expect(res.mydummyfield).to.equal('dummyFieldValue')        
        expect(res.meta.id).to.equal('dummyMyUserId')        
        expect(res.dummy_credential_id).to.equal('dummyCredentialId')

        done()

      })
    })

    it('should update a user password', function(done) {

      xhrMock.put('https://dummyBackendId.spacedog.io/1/credentials/dummyCredentialId/password', function(req, res) {

        expect(req.headers()).to.not.be.null
        expect(req.headers()['authorization']).to.not.be.undefined
        expect(req.headers()['authorization']).to.contain("Basic cmVndWxhckFkbWluOnJlZ3VsYXJBZG1pblBhc3N3b3Jk")

        return res.status(201).header('Content-Type', 'application/json').body(JSON.stringify({
          success:true
        }));
      });

      SpaceDog.Credentials.updatePassword({
        credentialId: "dummyCredentialId",
        newPassword: "newDummyPassword",
        challengedUsername: "regularAdmin",
        challengedPassword: "regularAdminPassword",
      }, function(err, res){

        expect(err).to.be.null
        expect(res).to.not.be.null

        expect(res.success).to.be.true

        done()

      })
    })

});

