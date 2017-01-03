var SpaceDog = require('../spacedog.min.js')

describe('settings #', function() {
  
    it('should get settings', function() {
      SpaceDog.initialize("dummyBackendId")

      SpaceDog.Settings.load("dummy").then(function(res){
        assert.equal(res, { foo:"bar" })
      })

      // mock
      // HTTP GET /{backendId}.spacedog.io/1/settings/dummy
      // => {
      //    foo:"bar",
      //    ...
      // }

    });

    it('should set settings', function() {
      SpaceDog.initialize("dummyBackendId")

      SpaceDog.Settings.set("dummy", {
        "foo2":"bar2"        
      })

      // mock
      // HTTP POST /{backendId}.spacedog.io/1/settings/dummy
      // avec paylod {
      //    foo2:"bar2",
      //    ...
      // }

    });


});