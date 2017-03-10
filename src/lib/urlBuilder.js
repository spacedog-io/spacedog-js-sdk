import Config from './config.js'


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
    }



}