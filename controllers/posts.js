//Etapes du CRUD

const Post = require("../models/Post");
const fs = require('fs');


//Logique métier de la diffusion de tous les posts
exports.getAllPosts = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(500).json({ error }));
};
// exports.getAllPosts = async(req, res) => {
//     try {
//         const posts = await Post.find();
//         return res.status(200).json(posts)
//     } catch(error){
//         return res.status(500).json({ error })
//     }
// }
