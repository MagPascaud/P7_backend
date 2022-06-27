const {Router} = require('express');
const {getOneUser,updateOneUser,deleteOneUser} = require('../controllers/users');

const router = Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

//Création des routes compte utilisateur
router.get('/:id', auth);
router.put('/:id', auth, multer);
router.delete('/:id', auth);


module.exports = router;