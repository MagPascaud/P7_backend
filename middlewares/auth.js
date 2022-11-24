const jwt = require('jsonwebtoken');

//Configuration du middleware d'authentification

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodenToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    req.userId = decodenToken.userId;
    next()
  } catch (error) {
    res.status(401).json({
      error: 'Invalid Token'
    });
  }
};