import UrlBuilder from './urlBuilder.js'
import Config from './config.js'

export default {
    /**
     * opts : { username:string, password:string, rememberMe:bool }
     * cb : callback function
     */
    login (opts, cb) {

        var data = JSON.stringify({});

        var xhr = new XMLHttpRequest();

        var url = UrlBuilder.forLogin();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            try {
                var json = JSON.parse(xhr.responseText);

                if (!json.success) {

                    cb(json, null)

                } else {
                    
                    Config.default_authorization_header = "Bearer "+json.accessToken
                    if (opts.rememberMe) {
                      localStorage.setItem('SPACEDOG_CREDENTIALS_TOKEN', JSON.stringify({
                        "accessToken":json.accessToken,
                        "backendId":Config.backendId
                      }))
                    }
                    cb(null, json)
                }

            } catch (e) {
                console.warn("SpaceDog.Credentials# could not parse xhr.responseText and therefore not able to 1/ set authorization headers 2/ remember user token, if rememberMe is true\nPossibly something else. Check the caught exeption:", e)
                cb(null, xhr.responseText)
            }
          }
        }

        xhr.open("GET", url);
        try {
            xhr.setRequestHeader("Authorization", "Basic "+new Buffer(opts.username+":"+opts.password).toString('base64'));
        } catch (e) {
            xhr.setRequestHeader("Authorization", "Basic "+btoa(opts.username+":"+opts.password));
        }

        xhr.send();
    },

    loginWithSavedCredentials (cb)  {

        var saved = JSON.parse(localStorage.getItem('SPACEDOG_CREDENTIALS_TOKEN'))

        Config.backendId = saved.backendId

        var authorization = "Bearer "+saved.accessToken  

        var xhr = new XMLHttpRequest();

        var url = UrlBuilder.forLogin();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            try {
                var json = JSON.parse(xhr.responseText);

                if (!json.success) {

                    cb(json, null)

                } else {
                    
                    Config.default_authorization_header = "Bearer "+json.accessToken
                    cb(null, json)
                }

            } catch (e) {
                console.warn("SpaceDog.Credentials# could not parse xhr.responseText and therefore not able to 1/ set authorization headers 2/ remember user token, if rememberMe is true\nPossibly something else. Check the caught exeption:", e)
                cb(null, xhr.responseText)
            }
          }
        }

        xhr.open("GET", url);
        xhr.setRequestHeader("Authorization", authorization);
        xhr.send();
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