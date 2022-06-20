const {Router} = require('express');
const {getAllPosts,getOnePost,createOnePost,updateOnePost,deleteOnePost,likeOrDislikeOnePost} = require('../controllers/posts');

const router = Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

//Création des routes posts
router.get('/', auth);
router.get('/:id', auth);
router.post('/', auth, multer);
router.put('/:id', auth, multer);
router.delete('/:id', auth);
router.post('/:id/like', auth);
router.get('/:id/comments', auth);


module.exports = router;