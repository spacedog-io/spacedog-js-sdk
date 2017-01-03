import UrlBuilder from './urlBuilder.js'

export default {
    search (opts, cb) {
        // Config.backendId

        var xhr = new XMLHttpRequest();
        xhr.onload = function (e) {
            cb(null, {})
        };
        xhr.open("POST", UrlBuilder.forSearch(opts.type), true);
        xhr.responseType = 'json';
        xhr.send();
    }
}