const mongoose = require('mongoose');

//Création du modèle de post
const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    userImageUrl: { type: String, required: false },
    textImageUrl: { type: String, required: false },
    postText: { type: String, required: true },
    createdDate: { type: Date },
    updatedDate: { type: Date },
    comment: { type: String, required: true },
    likes: { type: Number, default:0 },
    dislikes: { type: Number, default:0 },
    userLiked: { type: [String], default:[] },
    userDisliked: { type: [String], default:[] }
});

module.exports = mongoose.model('Post', postSchema);