import UrlBuilder from './urlBuilder.js'

export default {
    search (opts, cb) {
        // Config.backendId

        var data = JSON.stringify({});

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            try {
                cb(null, JSON.parse(this.responseText))
            } catch (e) {
                cb(null, this.responseText)
            }
          }
        });

        xhr.open("POST", UrlBuilder.forSearch(opts.type));
        xhr.setRequestHeader("content-type", "application/json");
        // TEST, to remove after we can update acl (see issue https://github.com/spacedog-io/spacedog-server/issues/54)
        xhr.setRequestHeader("authorization", "Basic ZHVtbXliYWNrZW5kOmhpIGR1bW15YmFja2VuZA==");

        xhr.send(data);

    }
}