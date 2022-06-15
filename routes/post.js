const {Router} = require('express');
// const {getAllPosts,getOnePost,createOnePost,updateOnePost,deleteOnePost,likeOrDislikeOnePost} = require('../controllers/posts');

const router = Router();
// const auth = require('../middlewares/auth');
// const multer = require('../middlewares/multer-config');

//Création des routes posts
router.get('/');
router.get('/:id');
router.post('/');
router.put('/:id');
router.delete('/:id');
router.post('/:id/like');
router.get('/:id/comments');


module.exports = router;