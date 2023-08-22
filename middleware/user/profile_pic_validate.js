// internal import

const uploader = require('../../utils/pic_uploader');


function profile_pic_uploader(req, res, next) {
    const upload = uploader("picture", ["image/jpeg", "image/jpg", "image/png"], 10000, "only jpeg,jpg and png images are allowed")

    upload.any()(req, res, (err) =>{
        if (err) {
            res.status(500).json({
                error: {
                    picture: {
                        msg: err.message
                    }
                }
            })
        } else {
            next()
        }
    })

}


module.exports = profile_pic_uploader