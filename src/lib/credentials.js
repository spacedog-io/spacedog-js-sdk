import UrlBuilder from './urlBuilder.js'
import Config from './config.js'
import UtilXHR from './utilXhr'

export default {
    /**
     * opts : { username:string, password:string, rememberMe:bool }
     * cb : callback function
     */
    login (opts, cb) {

        try {
            Config.default_authorization_header = "Basic "+new Buffer(opts.username+":"+opts.password).toString('base64')
        } catch (e) {
            Config.default_authorization_header = "Basic "+btoa(opts.username+":"+opts.password)
        }

        UtilXHR.get(UrlBuilder.forLogin(), function(err, data) {

            if (err != null) {

                Config.default_authorization_header = null                

            } else {

                Config.default_authorization_header = "Bearer "+data.accessToken

                if (opts.rememberMe) {
                    
                  localStorage.setItem('SPACEDOG_CREDENTIALS_TOKEN', JSON.stringify({
                    "accessToken":data.accessToken,
                    "backendId":Config.backendId
                  }))
                }
                
            }

            cb(err, data)

        })

    },

    loginWithSavedCredentials (cb)  {

        var saved = JSON.parse(localStorage.getItem('SPACEDOG_CREDENTIALS_TOKEN'))

        Config.backendId = saved.backendId

        Config.default_authorization_header = "Bearer "+saved.accessToken

        UtilXHR.get(UrlBuilder.forLogin(), function(err, data) {

            if (err == null) {

                Config.default_authorization_header = "Bearer "+data.accessToken

            }

            cb(err, data)

        })

    },


    forget () {
        Config.default_authorization_header = null
        localStorage.removeItem('SPACEDOG_CREDENTIALS_TOKEN')
    },

    getRememberedState () {
        return JSON.parse(localStorage.getItem('SPACEDOG_CREDENTIALS_TOKEN'))
    },

    canTryLogin () {
        return localStorage.getItem('SPACEDOG_CREDENTIALS_TOKEN')!=undefined && localStorage.getItem('SPACEDOG_CREDENTIALS_TOKEN')!=null
    }
}