
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
        Config.baseUrl = `https://${Config.backendId}.spacedog.io`
    },

    initializeWithBaseUrl (baseUrl) {
        if (baseUrl == undefined) {
            throw "BaseUrl is required."
        }
      Config.backendId = null
      Config.baseUrl = baseUrl
    },
    
    getBaseUrl () {
        return Config.baseUrl
    },

    getBackendId () {
        return Config.backendId
    },

    forgetAll () {
        Config.backendId = null
        Config.baseUrl = null
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
