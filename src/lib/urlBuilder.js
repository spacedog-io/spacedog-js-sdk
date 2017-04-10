import Config from './config.js'
var qs = require('qs');

export default {

    forLogin () {
        return `https://${Config.backendId}.spacedog.io/1/login`
    },

    forSchema () {
        return `https://${Config.backendId}.spacedog.io/1/schema`  
    },

    forOneSchema (type) {
        return `https://${Config.backendId}.spacedog.io/1/schema/${type}`  
    },

    forSearch (type) {
        return `https://${Config.backendId}.spacedog.io/1/search/${type}`
    },

    forCredentials () {
        return `https://${Config.backendId}.spacedog.io/1/credentials`
    },

    forData (type) {
        return `https://${Config.backendId}.spacedog.io/1/data/${type}`
    },

    forDataObject (type, id, opts) {
        var url = `https://${Config.backendId}.spacedog.io/1/data/${type}/${id}`
        if (opts) {
            return `${url}?${qs.stringify(opts)}`
        }
        return url
    },

}