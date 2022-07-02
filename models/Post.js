const mongoose = require('mongoose');

//Création du modèle de post
const postSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    imageUrl: { type: String, required: false },
    postText: { type: String, required: false },
    postTitle: { type: String, required: true },
    createdDate: { type: Date },
    updatedDate: { type: Date },
    likes: { type: Number, default:0 },
    userLiked: { type: [String], default:[] },
});

module.exports = mongoose.model('Post', postSchema);