//import des packages utiles
const express = require("express");
const cors = require("cors");
// const path = require('path');
const authRoutes = require("./routes/auth");
const postsRoutes = require('./routes/post');
const userssRoutes = require('./routes/user');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
  path: 'config/.env'
})


const app = express();
app.use(cors());

//Utilisation d'express.json pour analyser le corps des requêtes
app.use(express.json());


//Import du package Mongoose

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_MDP}@cluster0.ekvgs.mongodb.net/reseauSocial?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);


app.listen(3000, () => {
  console.log("mon serveur écoute le port 3000");
})