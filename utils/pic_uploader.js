// external imports
const path = require('path');
const multer = require('multer');


function uploader(
    subfolder_path,
    allow_file_types,
    max_file_size,
    error_msg,
){
    // file upload folder path
    const UPLOADS_FOLDER = `${__dirname}/../public/profile_pic/${subfolder_path}`;
    
    // design the storage
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, UPLOADS_FOLDER)
        },
        filename: function (req, file, cb) {
        const fileExit = path.extname(file.originalname)
        const fileName = file.originalname.replace(fileExit, '').toLowerCase().split(" ").join("_")+ "_" + Date.now()
        cb(null, fileName + fileExit)
        },
    });

    const upload = multer({
        storage: storage,
        limits:{
            fileSize: max_file_size,
        },
        fileFilter: (req, file, cb) => {
            if (allow_file_types.includes(file.mimetype)){
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error(error_msg))
            }
        }
    })

    return upload


}

module.exports = uploader;