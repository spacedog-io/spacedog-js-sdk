
export default class PaginationSession {

    constructor(from, size) {
        this._from = from
        this._size = size
        this._total = null
    }

    isNextPageAvailable () {
        if (this._total == null) {
            return true
        }
        return this._from + this._size < this._total
    }


    isPrevPageAvailable () {
        if (this._total == null) {
            return false
        }
        // console.log("isPrevPageAvailable from=", this._from, "size=", this._size)
        return this._from >= this._size
    }

    _newPageLoaded (result) {
        this._total = result.total
    }

    pointNextPage () {
        this._from += this._size
    }

    pointPrevPage () {
        this._from -= this._size
    }

    getFrom () {
        return this._from
    }

    getSize () {
        return this._size
    }

}