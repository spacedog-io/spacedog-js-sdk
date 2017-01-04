

import Config from './lib/config.js'
import Credentials from './lib/credentials.js'
import Data from './lib/data.js'


var SpaceDog = {
    initialize (backendId) {
        if (backendId == undefined) {
            throw "BackendId is required."
        }
        Config.backendId = backendId
    },
    
    getBackendId () {
        return Config.backendId
    },

    forgetAll () {
        Config.backendId = null
        Config.default_authorization_header = null
    }
}


SpaceDog._Config = Config // pas en release ?
SpaceDog.Credentials = Credentials
SpaceDog.Data = Data

export default SpaceDog
