const User = require("../models/User");
const fs = require('fs');

//Logique de la diffusion de tous les utilisateurs
exports.getAllUsers = (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).json({ error }));
};

//Logique de récupération d'un seul utilisateur
exports.getOneUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "Utilsateur non trouvé" })
            }
            res.status(200).json(user);
        })
        .catch(error => res.status(500).json({ error }));
};

//Logique de la mise à jour d'un utilisateur et/ou de son image
exports.updateOneUser = (req, res) => {
    const userObject = req.file ?
        {
            ...JSON.parse(req.body.user),
            imageUrl: `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}`
        } : { ...req.body };
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "utilisateur non trouvé" })
            }
            const oldImageName = user.imageUrl.split('/images/users/')[1];
            user.updateOne({ _id: req.params.id }, { ...userObject })
                .then(() => {
                    if (req.file) {
                        fs.unlink(`images/${oldImageName}`, () => {
                            console.log("fichier supprimé");
                        });
                    }
                    res.status(200).json({ message: "mis à jour de l'utilisateur" })
                })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//Logique de la suppression d'un utilisateur et son image
exports.deleteOneUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" })
            }
            const filename = user.imageUrl.split('/images/users/')[1];
            User.deleteOne({ _id: req.params.id })
                .then(() => {
                    fs.unlink(`images/users/${filename}`, () => {
                        console.log("fichier supprimé");
                    });
                    res.status(200).json({ message: 'Utilisateur supprimé' })
                })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};