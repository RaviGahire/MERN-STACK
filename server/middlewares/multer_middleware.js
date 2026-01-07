const multer = require('multer')

// multer middleware for file upload
const storage = multer.diskStorage({
    destination: 'public/user_profile_images',
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
})

exports.upload = multer({ storage: storage })


