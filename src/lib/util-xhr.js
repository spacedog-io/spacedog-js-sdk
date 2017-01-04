import Config from './config'

var _xend = function(method, payload, url, cb){

    var data = null;
    if (payload) {
        data = JSON.stringify(payload);
    }

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        try {
            var json = JSON.parse(xhr.responseText);
            if (json.success==false || !(xhr.status >= 200 && xhr.status < 300 )) {
                cb(json, null)

            } else {
                cb(null, json)
            }

        } catch (e) {
            console.warn("SpaceDog.Credentials# could not parse xhr.responseText (=",xhr.responseText,") and therefore not able to 1/ set authorization headers 2/ remember user token, if rememberMe is true\nPossibly something else. Check the caught exeption:", e)
            cb(xhr.responseText, null)
        }
      }
    }

    xhr.open(method, url);
    xhr.setRequestHeader("content-type", "application/json");

    if (Config.default_authorization_header != null) {
        xhr.setRequestHeader("authorization", Config.default_authorization_header)
    }

    if (data == null) {
        xhr.send()
    } else {
        xhr.send(data);
    }

}

export default {
    get (url, cb) {
        _xend("GET", null, url, cb)
    },

    post (payload, url, cb) {
        _xend("POST", null, url, cb)
    }
}