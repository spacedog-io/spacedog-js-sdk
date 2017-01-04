import UrlBuilder from './urlBuilder.js'
import UtilXHR from './util-xhr'

export default {

    /**
     * opts : { type:string }
     * cb : callback function
     */
    search (opts, cb) {

      UtilXHR.post({}, UrlBuilder.forSearch(opts.type), cb)

    }
}