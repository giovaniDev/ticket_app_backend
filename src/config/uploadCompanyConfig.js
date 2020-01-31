const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, path.resolve(__dirname, '..', '..', 'uploads', 'company'))
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
                const name = path.basename(file.originalname, ext)
                cb(null, `${name}-${Date.now()}${ext}`)
        }
    }),
    fileFilter: (req, file, cb) => {
        if (req.body.document_id.length !== 14) {
            return cb(null, false);
        } else {
            cb(null, true)
        }
    }
}