const { error_code } = require('./error_code')

function notFoundHandler(req, res, next) {
    next("404, your requested page does not exist")
}


function errorHandler(err, req, res, next) {
    const statusCode = res.statusCode ? res.statusCode : 500
    switch (statusCode) {
        case error_code.BAD_REQUEST:
            res.json({ title: "Bad request", message: err.message, stackTrace: err.stack });
            break;
        
        case error_code.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;
    
        default:
            console.log("unknown error")
            break;
    }
    
}



module.exports = { notFoundHandler, errorHandler }