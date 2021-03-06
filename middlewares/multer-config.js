const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
};

//Configuration de multer pour gérer les fichiers entrants
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log(req.originalUrl);
        callback(null, req.originalUrl.includes('api/users') ? 'images/users':'images/posts');
    },
    filename: (req, file, callback) => {
        console.log(file);
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');