import Config from './config.js'
import credentials from "./credentials";
var qs = require('qs');

export default {

    forLogin () {
        return `${Config.baseUrl}/1/login`
    },

    forSchema () {
        return `${Config.baseUrl}/1/schema`  
    },

    forOneSchema (type) {
        return `${Config.baseUrl}/1/schema/${type}`  
    },

    forSearch (type) {
        return `${Config.baseUrl}/1/search/${type}`
    },

    forCredentials () {
        return `${Config.baseUrl}/1/credentials`
    },

    forCredentialPassword (id) {
        return `${Config.baseUrl}/1/credentials/${id}/password`
    },

    forCredentialForgotPassword () {
        return `${Config.baseUrl}/1/credentials/forgotPassword`
    },

    forCredentialResetPassword (credential_id, password_reset_code) {
        return `${Config.baseUrl}/1/credentials/${credential_id}/password?passwordResetCode=${password_reset_code}`
    },

    forData (type) {
        return `${Config.baseUrl}/1/data/${type}`
    },

    forDataObject (type, id, opts) {
        var url = `${Config.baseUrl}/1/data/${type}/${id}`
        if (opts) {
            return `${url}?${qs.stringify(opts)}`
        }
        return url
    },

}