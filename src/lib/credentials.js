import UrlBuilder from './urlBuilder.js'
import Config from './config.js'
import UtilXHR from './utilXhr'

export default {

    canTryLogin() {
        return localStorage.getItem('SPACEDOG_CREDENTIALS_TOKEN') !== undefined && localStorage.getItem('SPACEDOG_CREDENTIALS_TOKEN') !== null
    },

    createUser(opts, cb) {

        UtilXHR.post({
                username: opts.credentials.username,
                password: opts.credentials.password,
                email: opts.credentials.email,
            },
            UrlBuilder.forCredentials(),
            function (err, data) {

                if (err === null) {

                    let userPayload = opts.user.payload;

                    userPayload[opts.user.credentialIdField] = data.id;

                    UtilXHR.post(opts.user.payload,
                        UrlBuilder.forData(opts.user.type),
                        function (err, data) {
                            if (err === null) {

                                userPayload.username = opts.credentials.username;
                                userPayload.email = opts.credentials.email;
                                userPayload.meta = {
                                    id: data.id
                                };

                                cb(null, userPayload);

                            } else {
                                cb(err, null);
                            }
                        });

                } else {

                    cb(err, null);

                }
            });

    },

    forget() {
        Config.default_authorization_header = null;
        localStorage.removeItem('SPACEDOG_CREDENTIALS_TOKEN')
    },

    forgotPassword(opts, cb) {
        UtilXHR.post(opts, UrlBuilder.forCredentialForgotPassword(), function (err, data) {
            if (err === null) {
                cb(null, data)
            } else {
                cb(err, null)
            }
        })
    },

    getEnabledState(opts, cb) {
        UtilXHR.get(UrlBuilder.forCredentialData(opts.credentialId), function (err, data) {
            if (err === null) {
                cb(null, data.enabled)
            } else {
                cb(err, null)
            }
        })
    },

    getRememberedState() {
        return JSON.parse(localStorage.getItem('SPACEDOG_CREDENTIALS_TOKEN'))
    },

    /**
     * opts : { username:string, password:string, rememberMe:bool }
     * cb : callback function
     */
    login(opts, cb) {

        try {
            Config.default_authorization_header = "Basic " + new Buffer(opts.username + ":" + opts.password).toString('base64')
        } catch (e) {
            Config.default_authorization_header = "Basic " + btoa(opts.username + ":" + opts.password)
        }

        UtilXHR.get(UrlBuilder.forLogin(), function (err, data) {

            if (err !== null) {

                Config.default_authorization_header = null

            } else {

                Config.default_authorization_header = "Bearer " + data.accessToken;

                if (opts.rememberMe) {

                    localStorage.setItem('SPACEDOG_CREDENTIALS_TOKEN', JSON.stringify({
                        "accessToken": data.accessToken,
                        "backendId": Config.backendId,
                        "baseUrl": Config.baseUrl
                    }))
                }

            }

            cb(err, data)

        })

    },

    loginWithSavedCredentials(cb) {

        let saved = JSON.parse(localStorage.getItem('SPACEDOG_CREDENTIALS_TOKEN'));

        Config.backendId = saved.backendId;
        Config.baseUrl = saved.baseUrl;
        Config.default_authorization_header = "Bearer " + saved.accessToken;

        UtilXHR.get(UrlBuilder.forLogin(), function (err, data) {

            if (err === null) {
                if (data && data.accessToken) {
                    Config.default_authorization_header = "Bearer " + data.accessToken
                }
            }

            cb(err, data)

        })

    },

    resetPassword(opts, cb) {
        UtilXHR.post({password: opts.password}, UrlBuilder.forCredentialResetPassword(opts.credentialId, opts.passwordResetCode), function (err, data) {
            if (err === null) {
                cb(null, data)
            } else {
                cb(err, null)
            }
        })
    },

    setEnabledState(opts, cb) {
        UtilXHR.put(opts.state, UrlBuilder.forCredentialEnabled(opts.credentialId), function (err, data) {
            if (err === null) {
                cb(null, data)
            } else {
                cb(err, null)
            }
        })
    },

    updatePassword(opts, cb) {


        UtilXHR.put(opts.newPassword, UrlBuilder.forCredentialPassword(opts.credentialId), function (err, data) {
            if (err === null) {
                cb(null, data)
            } else {
                cb(err, null)
            }

        }, {
            'authorization': 'Basic ' + btoa(opts.challengedUsername + ":" + opts.challengedPassword)
        })

    },
}