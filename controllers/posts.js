//Etapes du CRUD

const Post = require("../models/Post");
const fs = require('fs');
const { post } = require("../routes/post");


//Logique métier de la diffusion de tous les posts
exports.getAllPosts = (req, res) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
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

//Logique de récupération d'un seul post
exports.getOnePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: "Post non trouvé" })
            }
            res.status(200).json(post);
        })
        .catch(error => res.status(500).json({ error }));
};
// AVEC METHODE ASYNC/AWAIT :
// exports.getOnePost = async(req, res) => {
//     try {
//         const post = await Post.findOne()
//         return res.status(200).json(post)
//     } catch (error) {
//         return res.status(500).json({ error })
//     }
// }

//Logique de la créaton d'un post
exports.createOnePost = (req, res) => {
    const post = new Post({
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Post créé !' }))
        .catch(error => res.status(400).json({ error }));
};

//Logique de la mise à jour d'un post et/ou de son image
exports.updateOnePost = (req, res) => {
    const postObject = req.file ?
        {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
        } : { ...req.body };
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: "post non trouvé" })
            }
            const oldImageName = post.imageUrl.split('/images/')[1];
            post.updateOne({ _id: req.params.id }, { ...postObject })
                .then(() => {
                    if (req.file) {
                        fs.unlink(`images/${oldImageName}`, () => {
                            console.log("fichier supprimé");
                        });
                    }
                    res.status(200).json({ message: 'mis à jour du post' })
                })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
