var _store = {};

var localStorage = {
  setItem : function (k, v) {
    // console.log("localStorage#setItem",k,v)
    _store[k] = v;
  },
  getItem : function (k) {
    // console.log("localStorage#getItem",k)
    return _store[k]
  },
  reset: function() {
    _store = {}
  }
}

module.exports = localStorage;
