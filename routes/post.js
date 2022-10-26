const { Router } = require('express');
const { getAllPosts, getOnePost, createOnePost, updateOnePost, deleteOnePost, likeOnePost } = require('../controllers/posts');

const router = Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const isOwnerOrAdmin = require('../middlewares/isOwnerOrAdmin');

//Création des routes posts
router.get('/', auth, getAllPosts);
router.get('/:id', auth, getOnePost);
router.post('/', auth, multer, createOnePost);
router.put('/:id', auth, isOwnerOrAdmin, multer, updateOnePost);
router.delete('/:id', auth, isOwnerOrAdmin, deleteOnePost);
router.post('/:id/like', auth, likeOnePost);

module.exports = router;