//Etapes du CRUD

const Post = require("../models/Post");
const fs = require('fs');

//Logique métier de la diffusion de tous les posts

exports.getAllPosts = (req, res) => {
    Post.find()
        .populate('user', 'userName userImageUrl _id')
        .sort([['createdAt', -1]])
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(500).json({ message: error.message }));
};

// exports.getAllPosts = async(req, res) => {
//     try {
//         const posts = await Post.find().populate('user', '_id userName userImageUrl');
//         console.log(posts[0]);
//         return res.status(200).json(posts)
//     } catch(error){
//         return res.status(500).json({ message: error.message })
//     }
// }

//Logique de récupération d'un seul post

exports.getOnePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .populate('user', 'userName userImageUrl')
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: "Post non trouvé" })
            }
            res.status(200).json(post);
        })
        .catch(error => res.status(500).json({ message: error.message }));
};

//Logique de la créaton d'un post

exports.createOnePost = (req, res) => {
    const post = new Post({
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Post créé !' }))
        .catch(error => res.status(400).json({ message: error.message }));
};

//Logique de la mise à jour d'un post et/ou de son image

exports.updateOnePost = (req, res) => {
    const postObject = req.file ?
        {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
        } : { ...req.body };
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: "post non trouvé" })
            }
            let oldImageName;
            if (post.imageUrl) {
                oldImageName = post.imageUrl.split('images/posts/')[1]
            }
            Post.findOneAndUpdate({ _id: req.params.id }, postObject)
                .then(() => {
                    if (req.file && oldImageName) {
                        fs.unlink(`images/${oldImageName}`, () => {
                            console.log("fichier supprimé");
                        });
                    }
                    res.status(200).json({ message: 'mis à jour du post' })
                })
                .catch(error => res.status(400).json({ message: error.message }));
        })
        .catch(error => res.status(500).json({ message: error.message }));
};

//Logique de la suppression d'un post et son image

exports.deleteOnePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: "Post non trouvé" })
            }
            let fileName;
            if (post.imageUrl) {
                filename = post.imageUrl.split('../images/posts/')[1];
            }
            Post.deleteOne({ _id: req.params.id })
                .then(() => {
                    if (fileName) {
                        fs.unlink(`../images/posts/${filename}`, () => {
                            console.log("fichier supprimé");
                        });
                    }
                    res.status(200).json({ message: 'Post supprimé' })
                })
                .catch(error => res.status(400).json({ message: error.message }));
        })
        .catch(error => res.status(500).json({ message: error.message }));
};

//Logique de la possibilité à l'utilisateur de liker un post

exports.likeOnePost = (req, res) => {
    console.log(req.body)
    Post.findOne({ _id: req.params.id })
        .then(post => {
            //Si like = 1 et userId est false
            if (!post.userLiked.includes(req.body.userId)) {
                console.log(post)
                Post.updateOne({ _id: req.params.id },
                    {
                        $inc: { likes: 1 },
                        $push: { userLiked: req.body.userId }
                    })
                    .then(() => res.status(201).json({ message: "Je like ce post !" }))
                    .catch(error => res.status(400).json({ message: "update1" }));
            }
            //Si like = 1 et userId est true : on supprime le like et l'userId
            else {
                Post.updateOne({ _id: req.params.id },
                    {
                        $inc: { likes: -1 },
                        $pull: { userLiked: req.body.userId }
                    })
                    .then(() => res.status(201).json({ message: "Like retiré" }))
                    .catch(error => res.status(400).json({ message: "update2" }));
            }
        })
        .catch(error => {
            console.error(error)
            res.status(500).json({ message: "update3" })
        });
};