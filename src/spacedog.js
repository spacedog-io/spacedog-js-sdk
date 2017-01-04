

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
    }
}


SpaceDog._Config = Config // pas en release ?
SpaceDog.Credentials = Credentials
SpaceDog.Data = Data

export default SpaceDog
