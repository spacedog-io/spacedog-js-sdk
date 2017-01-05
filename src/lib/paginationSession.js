
export default class PaginationSession {

    constructor(from, size) {
        this._from = from
        this._size = size
        this._total = null
    }

    isNextPageAvailable () {
        console.log("isNextPageAvailable ", this._from , this._size , this._total, this._from + this._size < this._total)
        if (this._total == null) {
            return true
        }
        return this._from + this._size < this._total
    }

    _newPageLoaded (result) {
        this._total = result.total
    }

    pointNextPage () {
        this._from += this._size
    }

    getFrom () {
        return this._from
    }

    getSize () {
        return this._size
    }

}