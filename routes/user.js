const {Router} = require('express');
// const {getAllComments,getOneComment,createOneComment,updateOneComment,deleteOneComment,likeOrDislikeOneComment} = require('../controllers/comments');

const router = Router();
// const auth = require('../middlewares/auth');
// const multer = require('../middlewares/multer-config');

//Création des routes compte utilisateur
router.get('/:id');
router.put('/:id');
router.delete('/:id');


module.exports = router;