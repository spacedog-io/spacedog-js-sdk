import Config from './config'

let _xend = function(method, payload, url, cb, opts){

    let data = null;
    if (payload !== undefined || payload !== null) {
        data = JSON.stringify(payload);
    }

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        try {
            let json = JSON.parse(xhr.responseText);

            // console.log("-----\nSpaceDog.Xhr# (",xhr.url,") SUCCESS, json is : ", json, "\n------\n")

            if (json !== null && (json.success===false || !(xhr.status >= 200 && xhr.status < 300 ))) {
                cb(json, null)

            } else {
                cb(null, json)
            }

        } catch (e) {
            console.warn("-----\nSpaceDog.Xhr# could not parse xhr.responseText (=",xhr.responseText,") \n\n (xhr.url=",xhr.url,") \n\n (xhr.method=",xhr.method,") \n\n (xhr=",xhr,") and therefore not able to 1/ set authorization headers 2/ remember user token, if rememberMe is true\n\nPossibly something else. Check the caught exeption:\n\n", e,"\n\n-------\n");
            cb(xhr.responseText, null)
        }
      }
    };

    xhr.open(method, url);
    xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");

    if (opts && opts.authorization) {
        xhr.setRequestHeader("authorization", opts.authorization);
    } else if (Config.default_authorization_header !== null) {
        xhr.setRequestHeader("authorization", Config.default_authorization_header);
    }

    if (data === null) {
        xhr.send();
    } else {
        xhr.send(data);
    }

};

export default {
    get (url, cb) {
        _xend("GET", null, url, cb)
    },

    post (payload, url, cb) {
        _xend("POST", payload, url, cb)
    },

    put (payload, url, cb, opts) {
        _xend("PUT", payload, url, cb, opts)
    },

    delete (url, cb) {
        _xend("DELETE", null, url, cb)
    },
}