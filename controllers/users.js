const User = require("../models/User");
const fs = require('fs');

//Logique de récupération d'un seul utilisateur
exports.getOneUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" })
            }
            res.status(200).json(user);
        })
        .catch(error => res.status(500).json({ message: error.message }));
};

//Logique de la mise à jour d'un utilisateur et/ou de son image
exports.updateOneUser = (req, res) => {
    const userObject = req.file ?
        {
            ...req.body.user,
            userImageUrl: `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}`
        } : { ...req.body };
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "utilisateur non trouvé" })
            }
            let oldImageName;
            if (user.userImageUrl) {
                oldImageName = user.userImageUrl.split('/images/users/')[1];
            }
            User.updateOne({ _id: req.params.id }, userObject)
                .then(() => {
                    if (req.file && oldImageName) {
                        fs.unlink(`images/${oldImageName}`, () => {
                            console.log("fichier supprimé");
                        });
                    }
                    res.status(200).json({ message: "mis à jour de l'utilisateur" })
                })
                .catch(error => res.status(400).json({ message: error.message }));
        })
        .catch(error => res.status(500).json({ message: error.message }));
};

//Logique de la suppression d'un utilisateur et son image
exports.deleteOneUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" })
            }
            let oldImageName;
            if (user.imageUrl) {
                oldImageName = user.imageUrl.split('/../images/users/')[1];
            }
            User.deleteOne({ _id: req.params.id })
                .then(() => {
                    if (oldImageName) {
                        fs.unlink(`../images/users/${filename}`, () => {
                            console.log("fichier supprimé");
                        });
                    }
                    res.status(200).json({ message: 'Utilisateur supprimé' })
                })
                .catch(error => res.status(400).json({ message: error.message }));
        })
        .catch(error => res.status(500).json({ message: error.message }));
};