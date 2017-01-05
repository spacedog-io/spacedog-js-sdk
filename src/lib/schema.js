import UrlBuilder from './urlBuilder.js'
import UtilXHR from './utilXhr.js'

export default {

    /**
     * cb : callback function
     */
    list (cb) {

      UtilXHR.get(UrlBuilder.forSchema(), cb)

    }
}