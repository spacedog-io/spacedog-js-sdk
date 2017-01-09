import UrlBuilder from './urlBuilder.js'
import UtilXHR from './utilXhr'
import PaginationSession from './paginationSession.js'

var Data = {
    
    
    PaginationSession : PaginationSession,

    /**
     * opts : { type:string }
     * cb : callback function
     * paginationSession : optional paginationSession
     */
    search (opts, cb, paginationSession) {

        if (opts.payload == undefined) {
            opts.payload = {}
        }

        if (paginationSession) {

            opts.payload.from = paginationSession.getFrom(),
            opts.payload.size = paginationSession.getSize()

        }

        UtilXHR.post(opts.payload, UrlBuilder.forSearch(opts.type), function(err, data){
            if (err != null) {
                cb(err, data);
            } else {

                if (paginationSession)
                    paginationSession._newPageLoaded(data)
                
                cb(err, data)
            }
        });

    }

}

export default Data