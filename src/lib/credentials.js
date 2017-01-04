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

                Config.default_authorization_header = "Bearer "+json.accessToken
                if (opts.rememberMe) {
                  localStorage.setItem('SPACEDOG_CREDENTIALS_TOKEN', json.accessToken)
                }
                cb(null, json)
            } catch (e) {
                console.warn("SpaceDog.Credentials# could not parse xhr.responseText and therefore not able to 1/ set authorization headers 2/ remember user token, if rememberMe is true ; caught execotuion:", e)
                cb(null, xhr.responseText)
            }
          }
        }

        xhr.open("GET", url);
        xhr.setRequestHeader("Authorization", "Basic "+new Buffer(opts.username+":"+opts.password).toString('base64'));

        xhr.send(data);
    },

    canTryLogin () {
        return localStorage.getItem('SPACEDOG_CREDENTIALS_TOKEN')!=undefined && localStorage.getItem('SPACEDOG_CREDENTIALS_TOKEN')!=null
    }
}