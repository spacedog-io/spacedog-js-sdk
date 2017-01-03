import Config from './config.js'


export default {

    forSearch (type) {
        return `https://${Config.backendId}.spacedog.io/1/search/`+type
    }

}