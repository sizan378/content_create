const jwt = require('jsonwebtoken');

const tokenValidate = function(req, res, next) {
    const tokenHeader = req.headers.authorization
    if (tokenHeader && tokenHeader.startsWith("Bearer")) {
        token = tokenHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) =>{
            if (err) {
                res.status(401).json({
                    message: "Unauthorized user"
                })
            } else {
                req.user = decoded.user
                next()
            }
            
        })
    } else {
        throw new Error("user not authorized or token missing")
    }
    

}

module.exports = tokenValidate