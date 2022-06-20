const {Router} = require('express');
const {login,signup} = require('../controllers/auth');

const router = Router();

//Création des routes d'authtentification
router.post('/login', login);
router.post('/signup', signup);


module.exports = router;