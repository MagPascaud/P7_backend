const mongoose = require('mongoose');

//Création du modèle utilisateur
const uniqueValidator = require('mongoose-unique-validator');

//Création du modèle utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    userImageUrl: { type: String, required: false },
    isAdmin:  { type: Boolean, default: false }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);