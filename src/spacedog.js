
import push from './lib/push.js'
import credentials from './lib/credentials.js'
import data from './lib/data.js'
import setup from './lib/setup.js'

var SpaceDog = {
    initialize (backendId) {
        if (backendId == undefined) {
            throw "BackendId is required."
        }
        this._backendId = backendId
    },
    
    getBackendId () {
        return this._backendId
    }
}

// SpaceDog.Data = data

export default SpaceDog
