const mongoose = require('mongoose');

//Création du modèle de commentaire
const commentSchema = mongoose.Schema({
    userId: { type: String, required: true },
    postId: { type: String, required: true },
    comment: { type: String, required: true },
    createdDate: { type: Date },
    updatedDate: { type: Date }
});

module.exports = mongoose.model('Comment', commentSchema);