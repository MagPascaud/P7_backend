//import des packages utiles
const express = require("express");
const cors = require("cors");
const path = require('path');
const mongoose = require('mongoose');



const app = express();
app.use(cors());

//Utilisation d'express.json pour analyser le corps des requêtes
app.use(express.json());


//Import du package Mongoose

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_MDP}@cluster0.ekvgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));




app.listen(3000, () => {
  console.log("mon serveur écoute le port 3000");
})