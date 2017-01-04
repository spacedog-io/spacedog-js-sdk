import UrlBuilder from './urlBuilder.js'
import UtilXHR from './util-xhr'

export default {

    /**
     * cb : callback function
     */
    list (cb) {

      UtilXHR.get(UrlBuilder.forSchema(), cb)

    }
}