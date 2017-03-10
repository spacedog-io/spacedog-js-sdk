import UrlBuilder from './urlBuilder.js'
import UtilXHR from './utilXhr.js'

export default {

    /**
     * cb : callback function
     */
    list (cb) {

      UtilXHR.get(UrlBuilder.forSchema(), cb)

    },

    /**
     * type : string, the name of the schema
     * schemaDef : content for the new schema : _acl and other elastic search attributes
     * cb : callback function
     */
    create (type, schemaDef, cb) {

      var payload = {};
      payload[type] = schemaDef;

      UtilXHR.post(payload, UrlBuilder.forOneSchema(type), cb);

    },
}