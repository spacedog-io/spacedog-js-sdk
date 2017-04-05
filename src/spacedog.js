
import Config from './lib/config.js'
import Credentials from './lib/credentials.js'
import Data from './lib/data.js'
import Schema from './lib/schema.js'
import DataPermission from './lib/dataPermission.js'
import DataTypes from './lib/dataTypes.js'

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
SpaceDog.Schema = Schema
SpaceDog.DataPermission = DataPermission
SpaceDog.DataTypes = DataTypes

export default SpaceDog
