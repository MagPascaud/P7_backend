const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.userId } });

        if (!user) {
            return res
                .status(403)
                .json({ error: "Utilisateur non trouvé" });
        } else if (user.isAdmin) {
            return next();
        }
        switch (req.baseUrl) {
            case "/api/users":
                if (user.id != req.params.id) {
                    return res
                        .status(403)
                        .json({ error: "Vous n'avez pas les droits'" });
                }
                break;
            case "/api/posts":
                const foundPost = await Post.findOne({
                    where: {
                        id: req.params.id,
                        userId: user.id,
                    },
                });
                if (!foundPost) {
                    return res
                        .status(403)
                        .json({ error: "Vous n'avez pas les droits" });
                }
                break;
            default:
                return res
                    .status(400)
                    .json({ error: "Une erreur est survenue" });
        }
        return next();
    } catch (error) {
        return res.status(500).json({ error });
    }
};