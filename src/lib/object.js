import UrlBuilder from './urlBuilder'
import UtilXHR from './utilXhr'

export default class Object {

  constructor (type, id, payload) {
    this._type = type
    this._id = id
    this._payload = payload
  }

  create (cb) {
    var ret = this._payload;
    UtilXHR.post(this._payload, UrlBuilder.forData(this._type), function(err, data){

      if (data) {
        ret.meta = {
          id: data.id
        }
      }

      cb(err, ret)
    });
  }

  update (cb, opts) {
    UtilXHR.put(this._payload, UrlBuilder.forDataObject(this._type, this._id, opts), cb)
  }

  delete (cb) {
    UtilXHR.delete(UrlBuilder.forDataObject(this._type, this._id), cb)
  }

}