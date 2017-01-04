import UrlBuilder from './urlBuilder.js'

export default {

    /**
     * opts : { type:string }
     * cb : callback function
     */
    search (opts, cb) {

        var data = JSON.stringify({});

        var xhr = new XMLHttpRequest();

        var url = UrlBuilder.forSearch(opts.type);

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            try {
                cb(null, JSON.parse(xhr.responseText))
            } catch (e) {
                cb(null, xhr.responseText)
            }
          }
        }

        xhr.open("POST", url);
        xhr.setRequestHeader("content-type", "application/json");
        // TEST, to remove after we can update acl (see issue https://github.com/spacedog-io/spacedog-server/issues/54)
        //xhr.setRequestHeader("authorization", "Basic ZHVtbXliYWNrZW5kOmhpIGR1bW15YmFja2VuZA==");

        xhr.send(data);

    }
}