const {Router} = require('express');
const {getAllPosts,getOnePost,createOnePost,updateOnePost,deleteOnePost,likeOnePost} = require('../controllers/posts');

const router = Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

//Création des routes posts
router.get('/', auth, getAllPosts);
router.get('/:id', auth, getOnePost);
router.post('/', auth, multer, createOnePost);
router.put('/:id', auth, multer, updateOnePost);
router.delete('/:id', auth, deleteOnePost);
router.post('/:id/like', auth, likeOnePost);
router.get('/:id/comments', auth);


module.exports = router;