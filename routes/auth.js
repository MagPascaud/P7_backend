const {Router} = require('express');
// const {login,signup} = require('../controllers/auth');

const router = Router();

//Création des routes d'authtentification
router.post('/login');
router.post('/signup');


module.exports = router;