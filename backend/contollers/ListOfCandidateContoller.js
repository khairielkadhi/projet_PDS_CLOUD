const User = require('../models/SingUpModel');
const Candidate = require('../models/CondidateModel');
const Language = require('../models/LanguagesModel'); // Supposons que vous avez un modèle Language
const mongoose = require("mongoose");

module.exports.getUsersWithCandidates = async function getUsersWithCandidates(req, res) {
  try {
    const usersWithCandidates = await User.aggregate([
      {
        $lookup: {
          from: 'condidates',
          localField: '_id', // Utilisez '_id' comme le champ local (clé primaire de users)
          foreignField: 'userId', // Utilisez 'userId' comme le champ étranger dans candidates
          as: 'ALLcandidates',
        },
      },
      {
        $lookup: {
          from: 'languages',
          localField: 'ALLcandidates._id', // Champ lié à partir de la jointure précédente
          foreignField: 'CondidateId', // Utilisez 'CondidateId' comme champ étranger dans la table languages
          as: 'languages',
        },
      },
      {
        $lookup: {
          from: 'diplomas',
          localField: 'ALLcandidates._id', // Champ lié à partir de la jointure précédente
          foreignField: 'CondidateId', // Utilisez 'CondidateId' comme champ étranger dans la table languages
          as: 'diplomas',
        },
      },
      {
        $lookup: {
          from: 'experiences',
          localField: 'ALLcandidates._id', // Champ lié à partir de la jointure précédente
          foreignField: 'CondidateId', // Utilisez 'CondidateId' comme champ étranger dans la table languages
          as: 'experiences',
        },
      },
    ]);

    console.log(usersWithCandidates);
    res.json(usersWithCandidates);
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
};




module.exports.getUsersWithCandidatesByIdUser = async function getUsersWithCandidates(req, res) {
  try {
    // Récupérez l'ID de l'utilisateur à partir des paramètres de la requête
    const ObjectId = mongoose.Types.ObjectId;
    const userId = new ObjectId(req.params.userId); 

    console.log(req.params.userId)

    const usersWithCandidates = await User.aggregate([
      {
        $match: { _id: userId }, // Filtrez les utilisateurs en fonction de l'ID de l'utilisateur
      },
      {
        $lookup: {
          from: 'condidates',
          localField: '_id',
          foreignField: 'userId',
          as: 'ALLcandidates',
        },
      },
      {
        $lookup: {
          from: 'languages',
          localField: 'ALLcandidates._id',
          foreignField: 'CondidateId',
          as: 'languages',
        },
      },
      {
        $lookup: {
          from: 'diplomas',
          localField: 'ALLcandidates._id',
          foreignField: 'CondidateId',
          as: 'diplomas',
        },
      },
      {
        $lookup: {
          from: 'experiences',
          localField: 'ALLcandidates._id',
          foreignField: 'CondidateId',
          as: 'experiences',
        },
      },
    ]);

    console.log(usersWithCandidates);
    res.json(usersWithCandidates);
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
};