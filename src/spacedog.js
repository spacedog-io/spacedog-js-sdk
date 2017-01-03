
import Data from './lib/data.js'
import Config from './lib/config.js'

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



SpaceDog.Data = Data

export default SpaceDog
